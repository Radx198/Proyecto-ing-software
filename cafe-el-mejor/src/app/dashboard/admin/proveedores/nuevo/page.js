'use client';

import { guardarProveedor } from '@/utils/proveedores';
import { useRouter } from 'next/navigation';
import ProveedorForm from '@/components/ProveedorForm';

export default function page() {
  const router = useRouter();

  const handleGuardar = (proveedor) => {
    guardarProveedor(proveedor);
    router.push('/dashboard/admin/proveedores');
  };

  return (
    <div className="p-4 flex-1">
      <h1 className="text-xl font-bold mb-4">Registrar Proveedor</h1>
      <ProveedorForm onSubmit={handleGuardar} />
    </div>
  );
}
