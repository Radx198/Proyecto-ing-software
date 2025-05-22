'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCobranzas, eliminarCobranza } from '@/utils/cobranzas';
import AddIcon from '@mui/icons-material/Add';

export default function page() {
  const [cobranzas, setCobranzas] = useState([]);

  useEffect(() => {
    setCobranzas(getCobranzas());
  }, []);

  const handleEliminar = (id) => {
    eliminarCobranza(id);
    setCobranzas(getCobranzas());
  };

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Cobranzas</h1>
        <Link href="cobranzas/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Nueva Cobranza<AddIcon /></Link>
      </div>
      <ul className="space-y-2">
        {cobranzas.map((c) => (
          <li key={c.id} className="border p-4 rounded shadow">
            <p><strong>{c.identificacion}</strong> - {c.metodoPago}</p>
            <p>Producto: {c.producto}</p>
            <p>Cliente: {c.cliente}</p>
            <p>Fecha: {c.fecha}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/cobranzas/editar/${c.id}`} className="text-blue-600 underline">Editar</Link>
              <button onClick={() => handleEliminar(c.id)} className="text-red-600 underline">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
