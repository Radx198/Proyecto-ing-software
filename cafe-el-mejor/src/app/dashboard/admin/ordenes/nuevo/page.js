'use client';

import OrdenForm from '@/components/OrdenForm';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await fetch('/api/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/dashboard/admin/ordenes');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Orden de Compra</h1>
      <OrdenForm onSubmit={handleSubmit} />
    </div>
  );
}
