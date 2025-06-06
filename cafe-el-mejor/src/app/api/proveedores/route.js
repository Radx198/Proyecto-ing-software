import { connectDB } from '@/lib/mongoose';
import Proveedor from '@/models/Proveedor';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const proveedores = await Proveedor.find({
    nombreLegal: { $regex: q, $options: 'i' }
  }).sort({ createdAt: -1 });

  return NextResponse.json(proveedores);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await Proveedor.create(data);
  return Response.json(nuevo);
}
