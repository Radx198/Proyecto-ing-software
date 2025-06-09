import { connectDB } from '@/lib/mongoose';
import OrdenDeCompra from '@/models/OrdenDeCompra';
import Producto from '@/models/Producto';
import Cliente from '@/models/Cliente';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const { cliente, productos, metodoDePago } = data;

  if (!cliente || !productos?.length || !metodoDePago) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const clienteExistente = await Cliente.findById(cliente);

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

    const nuevaOrden = await OrdenDeCompra.create(
      [{
        clienteExistente,
        productos: productosProcesados,
        metodoDePago,
        precioTotal,
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(nuevaOrden[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error al finalizar compra:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// export async function GET() {
//   try {
//     await connectDB();
//     const ordenes = await OrdenDeCompra.find()
//       .populate('cliente') // si querés mostrar info del cliente
//       .populate('productos.producto') // para traer nombre/precio
//       .sort({ createdAt: -1 });

//     return Response.json(ordenes);
//   } catch (err) {
//     console.error('Error en GET /api/ordenes:', err.message);
//     return new Response(JSON.stringify({ error: 'Error al obtener órdenes' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const ordenes = await OrdenDeCompra.find({
    metodoDePago: { $regex: q, $options: 'i' }
  })
    .populate('cliente') // si querés mostrar info del cliente
    .populate('productos.producto') // para traer nombre/precio
    .sort({ createdAt: -1 });

  return NextResponse.json(ordenes);
}
