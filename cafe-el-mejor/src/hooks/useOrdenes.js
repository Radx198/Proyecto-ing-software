'use client'

import { useEffect, useState } from 'react';

export function useOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdenes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/ordenes');

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setOrdenes(data);
    } catch (err) {
      console.error('Error en fetchOrdenes:', err.message);
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrdenDeCompra = async (id) => {
    await fetch(`/api/ordenes/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  useEffect(() => { fetchOrdenes(); }, []);

  return { ordenes, loading, deleteOrdenDeCompra };
}
