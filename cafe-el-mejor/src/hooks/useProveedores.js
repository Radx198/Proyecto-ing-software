'use client';
import { useEffect, useState } from 'react';

export function useProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProveedores = async () => {
    setLoading(true);
    const res = await fetch('/api/proveedores');
    const data = await res.json();
    setProveedores(data);
    setLoading(false);
  };

  const deleteProveedor = async (id) => {
    await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
    fetchProveedores();
  };

  useEffect(() => { fetchProveedores(); }, []);

  return { proveedores, loading, deleteProveedor };
}
