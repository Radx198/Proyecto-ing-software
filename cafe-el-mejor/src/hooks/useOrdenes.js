'use client'

import { useEffect, useState } from 'react';

export function useOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdenes = async (query = '') => {
    setLoading(true);
    const res = await fetch(`/api/ordenes${query ? `?q=${query}` : ''}`);
    const data = await res.json();
    setOrdenes(data);
    setLoading(false);
  };

  const deleteOrdenDeCompra = async (id) => {
    await fetch(`/api/ordenes/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  useEffect(() => { fetchOrdenes(); }, []);

  return { ordenes, loading, deleteOrdenDeCompra, fetchOrdenes };
}
