import { connectDB } from '@/lib/mongoose';
import Usuario from '@/models/Usuario';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connectDB();
  const { mail, contraseña } = await request.json();

  const usuario = await Usuario.findOne({ mail });

  if (!usuario) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

  if (!contraseñaValida) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: usuario._id,
      role: usuario.role,
      nombre: usuario.nombre,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ message: 'Login exitoso' });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return response;
}
