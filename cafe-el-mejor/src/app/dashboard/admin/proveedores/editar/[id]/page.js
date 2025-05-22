'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProveedorPorId, actualizarProveedor } from '@/utils/proveedores';
import ProveedorForm from '@/components/ProveedorForm';

export default function EditarProveedorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    setProveedor(getProveedorPorId(id));
  }, [id]);

  const handleUpdate = (data) => {
    actualizarProveedor(id, data);
    router.push('/dashboard/admin/proveedores');
  };

  if (!proveedor) return <p className="p-4">Cargando proveedor...</p>;

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Editar Proveedor</h1>
      <ProveedorForm initialData={proveedor} onSubmit={handleUpdate} />
    </div>
  );
}
