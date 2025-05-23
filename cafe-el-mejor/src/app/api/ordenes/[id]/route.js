import { connectDB } from '@/lib/mongoose';
import OrdenDeCompra from '@/models/OrdenDeCompra';

export async function GET(_, { params }) {
  await connectDB();
  const ordenDeCompra = await OrdenDeCompra.findById(params.id);
  return Response.json(ordenDeCompra);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizado = await OrdenDeCompra.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await OrdenDeCompra.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
