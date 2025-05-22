'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductoById, updateProducto } from '@/utils/productos';
import ProductoForm from '@/components/ProductoForm';

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const p = getProductoById(params.id);
    if (!p) return router.push('/productos');
    setProducto(p);
  }, [params.id]);

  const handleSubmit = (data) => {
    updateProducto(params.id, data);
    router.push('/productos');
  };

  if (!producto) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Editar Producto</h1>
      <ProductoForm initialData={producto} onSubmit={handleSubmit} />
    </div>
  );
}
