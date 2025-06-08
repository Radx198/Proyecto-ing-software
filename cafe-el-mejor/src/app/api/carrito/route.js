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
  try {
    await connectDB();

    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ message: 'Tipo de contenido inválido' }, { status: 400 });
    }

    const body = await req.json();
    const { productoId, cantidad } = body;

    if (!productoId || typeof cantidad !== 'number' || cantidad <= 0) {
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
  } catch (error) {
    console.error('Error en POST /api/carrito:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { productoId } = body;

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
  } catch (error) {
    console.error('Error en DELETE /api/carrito:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
