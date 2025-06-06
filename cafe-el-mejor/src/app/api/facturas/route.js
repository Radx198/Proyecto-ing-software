import { connectDB } from '@/lib/mongoose';
import Factura from '@/models/Factura';
import Cliente from '@/models/Cliente';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const { identificacion, cliente, monto, metodoDePago } = data;

  if (!cliente || !monto || !identificacion || !metodoDePago) {
    return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const clienteExistente = await Cliente.findById(cliente);
  if (!clienteExistente) {
    return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
  }

  const nuevaFactura = await Factura.create({
    identificacion,
    metodoDePago,
    cliente,
    fecha: new Date(),
    monto
  });

  return Response.json(nuevaFactura);
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const facturas = await Factura.find({
    identificacion: { $regex: q, $options: 'i' }
  }).populate('cliente')
    .sort({ createdAt: -1 });;

  return NextResponse.json(facturas);
}
