'use client';

import { useRouter, useParams } from 'next/navigation';
import { getOrdenPorId, actualizarOrden } from '@/utils/ordenes';
import OrdenForm from '@/components/OrdenForm';
import { useEffect, useState } from 'react';

export default function page() {
  const { id } = useParams();
  const router = useRouter();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const data = getOrdenPorId(id);
    setOrden(data);
  }, [id]);

  const handleActualizar = (data) => {
    actualizarOrden(id, data);
    router.push('/dashboard/admin/ordenes');
  };

  if (!orden) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Editar Orden</h1>
      <OrdenForm initialData={orden} onSubmit={handleActualizar} />
    </div>
  );
}
