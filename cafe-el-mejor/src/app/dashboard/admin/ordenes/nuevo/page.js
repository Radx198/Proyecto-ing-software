'use client';

import OrdenForm from '@/components/OrdenForm';
import { guardarOrden } from '@/utils/ordenes';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  const handleGuardar = (orden) => {
    guardarOrden(orden);
    router.push('/dashboard/admin/ordenes');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Orden de Compra</h1>
      <OrdenForm onSubmit={handleGuardar} />
    </div>
  );
}
