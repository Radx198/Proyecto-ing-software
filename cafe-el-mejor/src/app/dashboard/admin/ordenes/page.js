'use client';

import AddIcon from '@mui/icons-material/Add';
import { getOrdenes, eliminarOrden } from '@/utils/ordenes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function page() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setOrdenes(getOrdenes());
  }, []);

  const handleDelete = (id) => {
    eliminarOrden(id);
    setOrdenes(getOrdenes());
  };

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Órdenes de Compra</h1>
        <Link href="ordenes/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Nueva Orden <AddIcon /></Link>
      </div>
      <ul className="space-y-2">
        {ordenes.map((orden) => (
          <li key={orden.id} className="border p-4 rounded shadow-sm">
            <p><strong>Cliente:</strong> {orden.cliente}</p>
            <p><strong>Productos:</strong> {orden.productos}</p>
            <p><strong>Método de pago:</strong> {orden.metodoPago}</p>
            <p><strong>Total:</strong> ${orden.precioTotal}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/ordenes/editar/${orden.id}`} className="text-blue-600 underline">Editar</Link>
              <button onClick={() => handleDelete(orden.id)} className="text-red-600 underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
