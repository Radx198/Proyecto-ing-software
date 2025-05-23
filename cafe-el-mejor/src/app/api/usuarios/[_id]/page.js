import { connectDB } from '@/lib/mongoose';
import Usuario from '@/models/Usuario';

export async function GET(request, { params }) {
  await connectDB();
  const usuario = await Usuario.findById(params.id);
  if (!usuario) return new Response('Usuario no encontrado', { status: 404 });
  return Response.json(usuario);
}

export async function PUT(request, { params }) {
  await connectDB();
  const data = await request.json();
  const usuarioActualizado = await Usuario.findByIdAndUpdate(params.id, data, { new: true });
  if (!usuarioActualizado) return new Response('No se pudo actualizar', { status: 400 });
  return Response.json(usuarioActualizado);
}

export async function DELETE(request, { params }) {
  await connectDB();
  await Usuario.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
