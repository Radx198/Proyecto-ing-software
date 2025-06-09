'use client';

import Link from 'next/link';
import { useCobranzas } from '@/hooks/useCobranzas';
import { useEffect, useState } from 'react';

export default function Page() {
  const { cobranzas, loading, deleteCobranza, fetchCobranzas } = useCobranzas();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCobranzas(query);
    }, 300);
    console.log(cobranzas)
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cobranzas</h1>
        <Link
          href="/dashboard/admin/cobranzas/nuevo"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Registrar Cobranza
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por producto..."
        className="mb-6 p-2 border rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : cobranzas.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron cobranzas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full hidden sm:block w-max mx-auto border border-gray-200 text-sm backdrop-blur-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-center">Ticket N°</th>
                <th className="px-4 py-2">Productos</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Método de Pago</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Precio Total</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cobranzas.map((cobranza, index) => (
                <tr key={cobranza._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>

                  <td className="px-4 py-2">
                    <ul className="list-disc ml-4">
                      {cobranza.productos.map((item, i) => (
                        <li key={i}>
                          {item.producto?.nombre || 'Producto eliminado'} x {item.cantidad}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-4 py-2">
                    {cobranza.cliente?.nombre} {cobranza.cliente?.apellido}
                    <br />
                    <span className="text-gray-600 text-xs">{cobranza.cliente?.email}</span>
                  </td>

                  <td className="px-4 py-2 capitalize">{cobranza.metodoDePago}</td>
                  <td className="px-4 py-2">
                    {new Date(cobranza.fecha).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>


                  <td className="px-4 py-2">${cobranza.monto.toFixed(2)}</td>

                  <td className="px-4 py-2 flex justify-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/admin/cobranzas/editar/${cobranza._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCobranza(cobranza._id)}
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
            {cobranzas.map((cobranza, index) => (
              <details
                key={cobranza._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-center cursor-pointer font-medium text-darkgreen">
                  <span>Ticket #{cobranza._id}</span>
                  <span className="text-right font-bold text-gray-800">${cobranza.monto.toFixed(2)}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Fecha: </strong>
                    {new Date(cobranza.fecha).toLocaleString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </div>
                  <div>
                    <strong>Método de Pago:</strong> {cobranza.metodoDePago}
                  </div>
                  <div>
                    <strong>Cliente:</strong>{' '}
                    {cobranza.cliente?.nombre} {cobranza.cliente?.apellido}
                    <br />
                    <span className="text-xs text-gray-500">{cobranza.cliente?.email}</span>
                  </div>
                  <div>
                    <strong>Productos:</strong>
                    <ul className="list-disc ml-5">
                      {cobranza.productos.map((item, i) => (
                        <li key={i}>
                          {item.producto?.nombre || 'Producto eliminado'} x {item.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <Link
                      href={`/dashboard/admin/cobranzas/editar/${cobranza._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCobranza(cobranza._id)}
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
