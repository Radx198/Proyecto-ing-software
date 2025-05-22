import { connectDB } from '@/lib/mongoose';
import Factura from '@/models/Factura';

export async function GET(_, { params }) {
  await connectDB();
  const factura = await Factura.findById(params.id);
  return Response.json(factura);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizado = await Factura.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Factura.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
