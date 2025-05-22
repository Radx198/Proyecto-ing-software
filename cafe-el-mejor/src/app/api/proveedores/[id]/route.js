import { connectDB } from '@/lib/mongoose';
import Proveedor from '@/models/Proveedor';

export async function GET(_, { params }) {
  await connectDB();
  const proveedor = await Proveedor.findById(params.id);
  return Response.json(proveedor);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizado = await Proveedor.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Proveedor.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
