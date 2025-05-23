import { connectDB } from '@/lib/mongoose';
import Cliente from '@/models/Cliente';

export async function GET(_, { params }) {
  await connectDB();
  const cliente = await Cliente.findById(params.id);
  return Response.json(cliente);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizado = await Cliente.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Cliente.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
