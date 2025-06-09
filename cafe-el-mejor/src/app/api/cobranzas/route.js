import { connectDB } from '@/lib/mongoose';
import Cobranza from '@/models/Cobranza';
import { NextResponse } from 'next/server';
import Cliente from '@/models/Cliente';
import Producto from '@/models/Producto';
import mongoose from 'mongoose';
import Carrito from '@/models/Carrito';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const cobranzasRaw = await Cobranza.find({})
    .populate('cliente', 'nombre apellido email usuarioId')
    .populate('productos.producto', 'nombre precio')
    .exec();

  const cobranzas = cobranzasRaw.filter(c =>
    c.productos.some(p =>
      p.producto?.nombre?.toLowerCase().includes(q.toLowerCase())
    )
  );

  return NextResponse.json(cobranzas);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const { cliente, productos, metodoDePago } = data;

  if (!productos?.length || !metodoDePago) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const clienteExistente = await Cliente.findOne({ usuarioId: cliente });

    if (!clienteExistente) {
      throw new Error('Cliente no encontrado para ese usuario');
    }

    let precioTotal = 0;
    const productosProcesados = [];

    for (const item of productos) {
      const producto = await Producto.findById(item.producto).session(session);

      if (!producto) {
        throw new Error(`Producto no encontrado: ${item.producto}`);
      }

      if (item.cantidad <= 0) {
        throw new Error(`Cantidad inválida para ${producto.nombre}`);
      }

      if (item.cantidad > 10) {
        throw new Error(`Solo 10 productos por compra ${producto.nombre}`);
      }

      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${producto.nombre} (disponible: ${producto.stock})`);
      }

      producto.stock -= item.cantidad;
      await producto.save({ session });

      precioTotal += producto.precio * item.cantidad;

      productosProcesados.push({
        producto: producto._id,
        cantidad: item.cantidad,
      });
    }

    const nuevaCobranza = await Cobranza.create(
      [{
        cliente: clienteExistente._id,
        productos: productosProcesados,
        metodoDePago,
        fecha: Date.now(),
        monto: precioTotal,
      }],
      { session }
    );

    const carrito = await Carrito.findOne({ usuario: clienteExistente });

    if (carrito) {
      carrito.items = []; // vaciar los items manualmente
      await carrito.save(); // guardar cambios
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(nuevaCobranza[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error al finalizar compra:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}