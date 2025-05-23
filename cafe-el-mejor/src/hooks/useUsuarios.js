'use client';

import { useEffect, useState } from 'react';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async (query = '') => {
    try {
      setLoading(true);

      const res = await fetch(`/api/usuarios${query ? `?q=${query}` : ''}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error('Error en fetchUsuarios:', err.message);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };


  const deleteUsuario = async (id) => {
    await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
    fetchUsuarios();
  };

  useEffect(() => { fetchUsuarios(); }, []);

  return { usuarios, loading, deleteUsuario, fetchUsuarios };
}

