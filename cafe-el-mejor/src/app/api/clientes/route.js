import { connectDB } from '@/lib/mongoose';
import Cliente from '@/models/Cliente';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const clientes = await Cliente.find({
    nombre: { $regex: q, $options: 'i' }
  }).sort({ createdAt: -1 });

  return NextResponse.json(clientes);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const clienteExistente = await Cliente.findOne({ mail: data.mail });

  if (clienteExistente) {
    return Response.json({ error: 'Ya existe un cliente con este mail' }, { status: 400 });
  }

  const nuevo = await Cliente.create(data);
  return Response.json(nuevo);
}