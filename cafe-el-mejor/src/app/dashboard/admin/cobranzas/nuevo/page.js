'use client';

import CobranzaForm from '@/components/CobranzaForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [form, setForm] = useState({
    metodoPago: '',
    producto: '',
    cliente: '',
    fecha: '',
  });

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/cobranzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, fecha: new Date(form.fecha) }),
    });
    router.push('/dashboard/admin/cobranzas');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Orden de Compra</h1>
      <CobranzaForm onSubmit={handleSubmit} />
    </div>
  );
}
