'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProveedorForm from '@/components/ProveedorForm';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProveedor() {
      try {
        const res = await fetch(`/api/proveedores/${id}`);
        if (!res.ok) throw new Error('No se pudo cargar el proveedor');
        const data = await res.json();
        setProveedor(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchProveedor();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`/api/proveedores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('../');
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al actualizar el proveedor');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!proveedor) {
    return <div className="p-4">Cargando proveedor...</div>;
  }

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Editar Proveedor</h1>
      <ProveedorForm initialData={proveedor} onSubmit={handleSubmit} />
    </div>
  );
}
