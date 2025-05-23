import { connectDB } from '@/lib/mongoose';
import Usuario from '@/models/Usuario';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const isFromAdminPanel = request.headers.get('referer')?.includes('/dashboard/admin');
  const allowedRoles = ['cliente'];
  if (isFromAdminPanel) {
    allowedRoles.push('admin', 'cajero', 'personalDeCompra');
  }

  if (!allowedRoles.includes(data.role)) {
    return NextResponse.json({ error: 'No autorizado a crear este tipo de usuario' }, { status: 403 });
  }

  const hashedPassword = await bcrypt.hash(data.contraseña, 10);

  const nuevoUsuario = await Usuario.create({
    ...data,
    contraseña: hashedPassword,
  });

  if (data.role === 'cliente') {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        mail: data.mail,
        telefono: data.telefono,
        direccion: data.direccion,
        usuarioId: nuevoUsuario._id,
      }),
    });
  }

  return NextResponse.json(nuevoUsuario);
}
