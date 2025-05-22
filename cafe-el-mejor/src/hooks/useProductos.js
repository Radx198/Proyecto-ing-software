'use client';
import { useEffect, useState } from 'react';

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    const res = await fetch('/api/productos');
    const data = await res.json();
    setProductos(data);
    setLoading(false);
  };

  const deleteProducto = async (id) => {
    await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    fetchProductos();
  };

  useEffect(() => { fetchProductos(); }, []);

  return { productos, loading, deleteProducto };
}
