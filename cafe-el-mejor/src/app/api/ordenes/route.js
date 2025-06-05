import { connectDB } from '@/lib/mongoose';
import OrdenDeCompra from '@/models/OrdenDeCompra';
import Producto from '@/models/Producto';
import Cliente from '@/models/Cliente';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const { cliente, productos, metodoDePago } = data;

  if (!cliente || !productos || productos.length === 0 || !metodoDePago) {
    return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const clienteExistente = await Cliente.findById(cliente);
  if (!clienteExistente) {
    return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
  }

  let precioTotal = 0;
  const productosProcesados = [];

  for (const item of productos) {
    const producto = await Producto.findById(item.producto);

    if (!producto) {
      return Response.json({ error: `Producto no encontrado: ${item.producto}` }, { status: 404 });
    }

    if (item.cantidad <= 0) {
      return Response.json({ error: 'Cantidad inválida' }, { status: 400 });
    }

    if (producto.stock < item.cantidad) {
      return Response.json({
        error: `Stock insuficiente para ${producto.nombre} (stock disponible: ${producto.stock})`
      }, { status: 400 });
    }

    precioTotal += producto.precio * item.cantidad;

    productosProcesados.push({
      producto: producto._id,
      cantidad: item.cantidad
    });

    producto.stock -= item.cantidad;
    await producto.save();
  }

  const nuevaOrden = await OrdenDeCompra.create({
    cliente,
    productos: productosProcesados,
    metodoDePago,
    precioTotal
  });

  return Response.json(nuevaOrden);
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
