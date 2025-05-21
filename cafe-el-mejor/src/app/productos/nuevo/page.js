'use client';

import { addProducto } from '@/utils/productos';
import ProductoForm from '@/components/ProductoForm';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function NuevaPaginaProducto() {
  const router = useRouter();

  const handleSubmit = (data) => {
    addProducto({ ...data, id: uuidv4() });
    router.push('/productos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Nuevo Producto</h1>
      <ProductoForm onSubmit={handleSubmit} />
    </div>
  );
}
