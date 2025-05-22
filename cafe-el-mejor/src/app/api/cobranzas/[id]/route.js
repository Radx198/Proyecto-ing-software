import { connectDB } from '@/lib/mongoose';
import Cobranza from '@/models/Cobranza';

export async function GET(_, { params }) {
  await connectDB();
  const cobranza = await Cobranza.findById(params.id);
  return Response.json(cobranza);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  await connectDB();
  const actualizada = await Cobranza.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(actualizada);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Cobranza.findByIdAndDelete(params.id);
  return Response.json({ message: 'Eliminado' });
}
