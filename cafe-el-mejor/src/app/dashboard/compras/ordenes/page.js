'use client';

import Link from 'next/link';
import { useOrdenes } from '@/hooks/useOrdenes';
import { useState, useEffect } from 'react';

export default function OrdenesPage() {
  const { ordenes, loading, deleteOrdenDeCompra, fetchOrdenes } = useOrdenes();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOrdenes(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Órdenes de Compra</h1>
        <Link
          href="/dashboard/compras/ordenes/nuevo"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Registrar Orden
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por medio de pago..."
        className="mb-6 p-2 border rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : ordenes.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron órdenes.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="hidden sm:block w-max mx-auto border border-gray-200 text-sm backdrop-blur-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-center">Orden N°</th>
                <th className="px-4 py-2">Productos</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Método de Pago</th>
                <th className="px-4 py-2">Precio Total</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden, index) => (
                <tr key={orden._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>

                  <td className="px-4 py-2">
                    <ul className="list-disc ml-4">
                      {orden.productos.map((item, i) => (
                        <li key={i}>
                          {item.producto?.nombre || 'Producto eliminado'} x {item.cantidad}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-4 py-2">
                    {orden.cliente?.nombre} {orden.cliente?.apellido}
                    <br />
                    <span className="text-gray-600 text-xs">{orden.cliente?.email}</span>
                  </td>

                  <td className="px-4 py-2 capitalize">{orden.metodoDePago}</td>

                  <td className="px-4 py-2">${(orden.precioTotal).toFixed(2)}</td>

                  <td className="px-4 py-2 flex justify-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/compras/ordenes/editar/${orden._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteOrdenDeCompra(orden._id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sm:hidden flex flex-col gap-4 text-xs bg-white">
            {ordenes.map((orden, index) => (
              <details
                key={orden._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-center cursor-pointer font-medium text-darkgreen">
                  <span>Orden #{orden._id}</span>
                  <span className="text-right font-bold text-gray-800">${orden.precioTotal.toFixed(2)}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Método de Pago:</strong> {orden.metodoDePago}
                  </div>
                  <div>
                    <strong>Cliente:</strong>{' '}
                    {orden.cliente?.nombre} {orden.cliente?.apellido}
                    <br />
                    <span className="text-xs text-gray-500">{orden.cliente?.email}</span>
                  </div>
                  <div>
                    <strong>Productos:</strong>
                    <ul className="list-disc ml-5">
                      {orden.productos.map((item, i) => (
                        <li key={i}>
                          {item.producto?.nombre || 'Producto eliminado'} x {item.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <Link
                      href={`/dashboard/compras/ordenes/editar/${orden._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteOrdenDeCompra(orden._id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
