import { connectDB } from '@/lib/mongoose';
import Cliente from '@/models/Cliente';

export async function GET() {
  await connectDB();
  const clientes = await Cliente.find().sort({ createdAt: -1 });
  return Response.json(clientes);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const nuevo = await Cliente.create(data);
  return Response.json(nuevo);
}
