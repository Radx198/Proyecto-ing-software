'use client';

import AddIcon from '@mui/icons-material/Add';
import { getProveedores, eliminarProveedor } from '@/utils/proveedores';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function page() {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    setProveedores(getProveedores());
  }, []);

  const handleDelete = (id) => {
    eliminarProveedor(id);
    setProveedores(getProveedores());
  };

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Proveedores</h1>
        <Link href="proveedores/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Nuevo Proveedor<AddIcon /></Link>
      </div>
      <ul className="space-y-2">
        {proveedores.map((p) => (
          <li key={p.id} className="border p-4 rounded shadow">
            <p><strong>{p.nombreLegal}</strong> - {p.contacto}</p>
            <p>{p.direccion}</p>
            <p>Inicio: {p.fechaInicio} | Fin: {p.fechaFin}</p>
            <p>Últ. entrega: {p.fechaUltEntrega}</p>
            <p><strong>Productos:</strong> {p.productos}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/proveedores/editar/${p.id}`} className="text-blue-600 underline">Editar</Link>
              <button onClick={() => handleDelete(p.id)} className="text-red-600 underline">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
