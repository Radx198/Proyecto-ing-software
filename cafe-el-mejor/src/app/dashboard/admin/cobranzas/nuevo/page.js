'use client';

import { guardarCobranza } from '@/utils/cobranzas';
import { useRouter } from 'next/navigation';
import CobranzaForm from '@/components/CobranzaForm';

export default function NuevaCobranzaPage() {
  const router = useRouter();

  const handleGuardar = (data) => {
    guardarCobranza(data);
    router.push('/dashboard/admin/cobranzas');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Cobranza</h1>
      <CobranzaForm onSubmit={handleGuardar} />
    </div>
  );
}
