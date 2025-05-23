import { useState, useEffect } from 'react';

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async (query = '') => {
    setLoading(true);
    const res = await fetch(`/api/productos${query ? `?q=${query}` : ''}`);
    const data = await res.json();
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const deleteProducto = async (id) => {
    await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    fetchProductos();
  };

  return { productos, loading, deleteProducto, fetchProductos };
}
