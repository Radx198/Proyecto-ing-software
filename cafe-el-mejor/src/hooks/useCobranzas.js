'use client';

import { useEffect, useState } from 'react';

export function useCobranzas() {
  const [cobranzas, setCobranzas] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchCobranzas = async (query = '') => {
    setLoading(true);
    const res = await fetch(`/api/cobranzas${query ? `?q=${query}` : ''}`);
    const data = await res.json();
    setCobranzas(data);
    setLoading(false);
  };

  const addCobranza = async (nueva) => {
    const res = await fetch('/api/cobranzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nueva),
    });
    const data = await res.json();
    await fetchCobranzas();
    return data;
  };

  const updateCobranza = async (id, actualizada) => {
    const res = await fetch(`/api/cobranzas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizada),
    });
    const data = await res.json();
    await fetchCobranzas();
    return data;
  };

  const deleteCobranza = async (id) => {
    await fetch(`/api/cobranzas/${id}`, { method: 'DELETE' });
    await fetchCobranzas();
  };

  useEffect(() => {
    fetchCobranzas();
  }, []);

  return {
    cobranzas,
    loading,
    addCobranza,
    updateCobranza,
    deleteCobranza,
    fetchCobranzas
  };
}
