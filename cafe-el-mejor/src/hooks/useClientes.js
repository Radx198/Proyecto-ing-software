'use client';
import { useEffect, useState } from 'react';

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    setLoading(true);
    const res = await fetch('/api/clientes');
    const data = await res.json();
    setClientes(data);
    setLoading(false);
  };

  const deleteCliente = async (id) => {
    await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
    fetchClientes();
  };

  useEffect(() => { fetchClientes(); }, []);

  return { clientes, loading, deleteCliente };
}
