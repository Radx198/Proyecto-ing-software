import { connectDB } from '@/lib/mongoose';
import OrdenDeCompra from '@/models/OrdenDeCompra';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await OrdenDeCompra.create(data);
  return Response.json(nuevo);
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
    .populate('proveedor')
    .sort({ createdAt: -1 });

  return NextResponse.json(ordenes);
}
