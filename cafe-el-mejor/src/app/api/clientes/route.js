import { connectDB } from '@/lib/mongoose';
import Cliente from '@/models/Cliente';

export async function GET() {
  await connectDB();
  const clientes = await Cliente.find().sort({ createdAt: -1 });
  return Response.json(clientes);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  const clienteExistente = await Cliente.findOne({ mail: data.mail });

  if (clienteExistente) {
    return Response.json({ error: 'Ya existe un cliente con este mail' }, { status: 400 });
  }

  const nuevo = await Cliente.create(data);
  return Response.json(nuevo);
}