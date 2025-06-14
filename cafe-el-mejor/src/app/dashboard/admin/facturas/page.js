'use client';

import Link from 'next/link';
import { useFacturas } from '@/hooks/useFacturas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';

export default function FacturasPage() {
  const { facturas, loading, fetchFacturas } = useFacturas();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFacturas(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Facturas</h1>
        <Link
          href="/dashboard/admin/facturas/nuevo"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Registrar Factura
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por ID de factura..."
        className="mb-6 p-2 border rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : facturas.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron facturas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="backdrop-blur-md w-full hidden sm:block w-max mx-auto border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-center">Identificación</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Método de Pago</th>
                <th className="px-4 py-2">Monto</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura, index) => (
                <tr key={factura._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{factura.identificacion}</td>

                  <td className="px-4 py-2">
                    {factura.cliente?.nombre} {factura.cliente?.apellido}
                    <br />
                    <span className="text-gray-600 text-xs">{factura.cliente?.email}</span>
                  </td>

                  <td className="px-4 py-2 capitalize">
                    {new Date(factura.fecha).toLocaleString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-2 capitalize">{factura.metodoDePago === 'tarjeta' ? 'Tarjeta de Credito' : factura.metodoDePago}</td>
                  <td className="px-4 py-2">${factura.monto.toFixed(2)}</td>

                  <td className="px-4 py-2 flex justify-center gap-3 whitespace-nowrap items-center">
                    <div>
                      <Link
                        href={`/dashboard/admin/facturas/ver/${factura._id}`}
                        className="hover:underline"
                      >
                        <VisibilityIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sm:hidden flex flex-col gap-4 text-xs bg-white">
            {facturas.map((factura, index) => (
              <details
                key={factura._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-center cursor-pointer font-medium text-darkgreen">
                  <span>{factura.identificacion}</span>
                  <span className="text-right font-bold text-gray-800">${factura.monto.toFixed(2)}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Fecha: </strong>
                    {new Date(factura.fecha).toLocaleString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </div>
                  <div>
                    <strong>Método de Pago:</strong> {factura.metodoDePago}
                  </div>
                  <div>
                    <strong>Cliente:</strong>{' '}
                    {factura.cliente?.nombre} {factura.cliente?.apellido}
                    <br />
                    <span className="text-xs text-gray-500">{factura.cliente?.email}</span>
                  </div>
                  <div className="self-center flex items-center justify-center gap-4 pt-2">
                    <div>
                      <Link
                        href={`/dashboard/admin/facturas/ver/${factura._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <VisibilityIcon />
                      </Link>
                    </div>
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
