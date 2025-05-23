import { connectDB } from '@/lib/mongoose';
import Usuario from '@/models/Usuario';
import Cliente from '@/models/Cliente';
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
    const clienteExistente = await Cliente.findOne({ dni: data.dni });
  
    if (clienteExistente) {
      clienteExistente.usuarioId = nuevoUsuario._id;
      await clienteExistente.save();
    } else {
      await Cliente.create({
        nombre: data.nombre,
        apellido: data.apellido,
        mail: data.mail,
        telefono: data.telefono,
        direccion: data.direccion,
        dni: data.dni,
        usuarioId: nuevoUsuario._id,
      });
    }
  }
  



  return NextResponse.json(nuevoUsuario);
}


export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const usuarios = await Usuario.find({
    $or: [
      { nombre: { $regex: q, $options: 'i' } },
      { apellido: { $regex: q, $options: 'i' } },
      { mail: { $regex: q, $options: 'i' } }
    ]
  });

  return NextResponse.json(usuarios);
}