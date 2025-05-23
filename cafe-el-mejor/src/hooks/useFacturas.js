'use client'

import { useEffect, useState } from 'react';

export function useFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacturas = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/facturas');

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setFacturas(data);
    } catch (err) {
      console.error('Error en fetchFacturas:', err.message);
      setFacturas([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrdenDeCompra = async (id) => {
    await fetch(`/api/facturas/${id}`, { method: 'DELETE' });
    fetchFacturas();
  };

  useEffect(() => { fetchFacturas(); }, []);

  return { facturas, loading, deleteOrdenDeCompra };
}
