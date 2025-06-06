'use client';
import { useEffect, useState } from 'react';

export function useProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProveedores = async (query = '') => {
    setLoading(true);
    const res = await fetch(`/api/proveedores${query ? `?q=${query}` : ''}`);
    const data = await res.json();
    setProveedores(data);
    setLoading(false);
  };

  const deleteProveedor = async (id) => {
    await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
    fetchProveedores();
  };

  useEffect(() => { fetchProveedores(); }, []);

  return { proveedores, loading, deleteProveedor, fetchProveedores };
}
