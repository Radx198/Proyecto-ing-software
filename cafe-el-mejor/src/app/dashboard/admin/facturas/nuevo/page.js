'use client';

import { useRouter } from 'next/navigation';
import FacturaForm from '@/components/FacturaForm';

export default function Page() {

  const router = useRouter();

  const handleSubmit = async (data) => {
    await fetch('/api/facturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, fecha: new Date(data.fecha) }),
    });
    router.push('/dashboard/admin/facturas');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Factura</h1>
      <FacturaForm onSubmit={handleSubmit} />
    </div>
  );
}
