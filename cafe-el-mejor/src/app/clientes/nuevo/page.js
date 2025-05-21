'use client';

import { addCliente } from '@/utils/clientes';
import ClienteForm from '@/components/ClienteForm';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function NuevoClientePage() {
  const router = useRouter();

  const handleSubmit = (data) => {
    addCliente({ ...data, id: uuidv4() });
    router.push('/clientes');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nuevo Cliente</h1>
      <ClienteForm onSubmit={handleSubmit} />
    </div>
  );
}
