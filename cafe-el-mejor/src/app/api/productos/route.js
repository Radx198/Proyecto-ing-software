import { connectDB } from '@/lib/mongoose';
import Producto from '@/models/Producto';

export async function GET() {
  await connectDB();
  const productos = await Producto.find().sort({ createdAt: -1 });
  return Response.json(productos);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await Producto.create(data);
  return Response.json(nuevo);
}
