import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Carrito from '@/models/Carrito';
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

export async function PUT(req, { params }) {
  await connectDB();
  const userId = getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const { productoId } = params;
  const { cantidad } = await req.json();

  if (cantidad < 0) {
    return NextResponse.json({ message: 'Cantidad inválida' }, { status: 400 });
  }

  const carrito = await Carrito.findOne({ usuario: userId });
  if (!carrito) return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });

  const index = carrito.items.findIndex(item => item.producto.toString() === productoId);

  if (index === -1) {
    return NextResponse.json({ message: 'Producto no está en el carrito' }, { status: 404 });
  }

  if (cantidad === 0) {
    carrito.items.splice(index, 1);
  } else {
    carrito.items[index].cantidad = cantidad;
  }

  await carrito.save();

  return NextResponse.json({ message: 'Producto actualizado correctamente' });
}

export async function DELETE(req, { params }) {
  await connectDB();
  const userId = getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const { id } = params;

  const carrito = await Carrito.findOne({ usuario: userId });
  if (!carrito) return NextResponse.json({ message: 'Carrito no encontrado' }, { status: 404 });

  carrito.items = carrito.items.filter(item => item.producto.toString() !== id);

  await carrito.save();

  return NextResponse.json({ message: 'Producto eliminado del carrito' });
}
