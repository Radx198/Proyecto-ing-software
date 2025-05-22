import { connectDB } from '@/lib/mongoose';
import Proveedor from '@/models/Proveedor';

export async function GET() {
  await connectDB();
  const proveedores = await Proveedor.find().sort({ createdAt: -1 });
  return Response.json(proveedores);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await Proveedor.create(data);
  return Response.json(nuevo);
}
