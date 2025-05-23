import { connectDB } from '@/lib/mongoose';
import Factura from '@/models/Factura';
import Cliente from '@/models/Cliente';

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

  const nuevaFactura = await Factura.create({
    cliente,
    productos: productosProcesados,
    metodoDePago,
    precioTotal
  });

  return Response.json(nuevaFactura);
}

export async function GET() {
  try {
    await connectDB();
    const facturas = await Factura.find()
      .populate('cliente') // si querés mostrar info del cliente
      .sort({ createdAt: -1 });

    return Response.json(facturas);
  } catch (err) {
    console.error('Error en GET /api/facturas:', err.message);
    return new Response(JSON.stringify({ error: 'Error al obtener órdenes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
