//api/productos/[id]

import { connectDB } from '@/lib/mongoose';
import Producto from '@/models/Producto';

export async function GET(_, { params }) {
  await connectDB();
  const producto = await Producto.findById(params.id);
  return Response.json(producto);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizado = await Producto.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Producto.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
