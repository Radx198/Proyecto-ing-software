//api/productos/

import { connectDB } from '@/lib/mongoose';
import Producto from '@/models/Producto';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const productos = await Producto.find({
    nombre: { $regex: q, $options: 'i' }
  });

  return NextResponse.json(productos);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await Producto.create(data);
  return Response.json(nuevo);
}