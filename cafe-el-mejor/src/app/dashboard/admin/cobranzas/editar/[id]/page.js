'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCobranzaPorId, actualizarCobranza } from '@/utils/cobranzas';
import CobranzaForm from '@/components/CobranzaForm';

export default function page() {
  const { id } = useParams();
  const router = useRouter();
  const [cobranza, setCobranza] = useState(null);

  useEffect(() => {
    setCobranza(getCobranzaPorId(id));
  }, [id]);

  const handleUpdate = (data) => {
    actualizarCobranza(id, data);
    router.push('/dashboard/admin/cobranzas');
  };

  if (!cobranza) return <p className="p-4">Cargando cobranza...</p>;

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Editar Cobranza</h1>
      <CobranzaForm initialData={cobranza} onSubmit={handleUpdate} />
    </div>
  );
}
