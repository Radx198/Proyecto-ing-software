import { connectDB } from '@/lib/mongoose';
import Cobranza from '@/models/Cobranza';

export async function GET() {
  await connectDB();
  const cobranzas = await Cobranza.find().sort({ createdAt: -1 })
  .populate('cliente', 'nombre apellido email')
  .populate('productos.producto', 'nombre precio')
  .exec();
  return Response.json(cobranzas);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nueva = await Cobranza.create(data);
  return Response.json(nueva);
}
