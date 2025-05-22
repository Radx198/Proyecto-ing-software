'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getClienteById, updateCliente } from '@/utils/clientes';
import ClienteForm from '@/components/ClienteForm';

export default function EditarClientePage() {
  const { id } = useParams();
  const router = useRouter();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const data = getClienteById(id);
    if (!data) return router.push('/clientes');
    setCliente(data);
  }, [id]);

  const handleSubmit = (data) => {
    updateCliente(id, data);
    router.push('/dashboard/admin/clientes');
  };

  if (!cliente) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
      <ClienteForm initialData={cliente} onSubmit={handleSubmit} />
    </div>
  );
}
