import { connectDB } from '@/lib/mongoose';
import Cobranza from '@/models/Cobranza';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const cobranzas = await Cobranza.find({
    nombre: { $regex: q, $options: 'i' }
  })
    .sort({ createdAt: -1 })
    .populate('cliente', 'nombre apellido email')
    .populate('productos.producto', 'nombre precio')
    .exec();;

  return NextResponse.json(cobranzas);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nueva = await Cobranza.create(data);
  return Response.json(nueva);
}
