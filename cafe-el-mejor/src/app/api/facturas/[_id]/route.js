import { connectDB } from '@/lib/mongoose';
import Factura from '@/models/Factura';

export async function GET(_, { params }) {
  const { _id } = await params;
  await connectDB();
  const factura = await Factura.findById(_id).populate('cliente');
  return Response.json(factura);
}

export async function PUT(request, { params }) {
  const { _id } = await params;
  const data = await request.json();
  await connectDB();
  const actualizado = await Factura.findByIdAndUpdate(_id, data, { new: true });
  return Response.json(actualizado);
}

export async function DELETE(_, { params }) {
  const { _id } = await params;
  await connectDB();
  await Factura.findByIdAndDelete(_id);
  return Response.json({ message: 'Eliminado' });
}
