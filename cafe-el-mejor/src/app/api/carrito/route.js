import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Carrito from '@/models/Carrito';
import Producto from '@/models/Producto';
import { connectDB } from '@/lib/mongoose';

function getUserIdFromToken(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    return null;
  }
}

export async function GET(req) {
  await connectDB();

  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const carrito = await Carrito.findOne({ usuario: userId }).populate('items.producto');

  return NextResponse.json(carrito || { items: [] });
}

export async function POST(req) {
  await connectDB();

  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const { productoId, cantidad } = await req.json();

  if (!productoId || cantidad <= 0) {
    return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
  }

  const producto = await Producto.findById(productoId);
  if (!producto) {
    return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
  }

  let carrito = await Carrito.findOne({ usuario: userId });

  if (!carrito) {
    carrito = new Carrito({ usuario: userId, items: [] });
  }

  const index = carrito.items.findIndex(item => item.producto.toString() === productoId);

  if (index >= 0) {
    carrito.items[index].cantidad += cantidad;
  } else {
    carrito.items.push({ producto: productoId, cantidad });
  }

  await carrito.save();

  return NextResponse.json({ message: 'Producto agregado al carrito' });
}

export async function DELETE(req) {
  await connectDB();

  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const { productoId } = await req.json();

  const carrito = await Carrito.findOne({ usuario: userId });
  if (!carrito) {
    return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });
  }

  if (productoId) {
    carrito.items = carrito.items.filter(item => item.producto.toString() !== productoId);
  } else {
    carrito.items = [];
  }

  await carrito.save();

  return NextResponse.json({ message: 'Carrito actualizado' });
}
