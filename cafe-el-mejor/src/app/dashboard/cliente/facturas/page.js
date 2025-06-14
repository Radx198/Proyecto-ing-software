'use client';

import Link from 'next/link';
import { useFacturas } from '@/hooks/useFacturas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import { getSession } from '@/utils/auth';

export default function FacturasPage() {
  const { facturas, loading, fetchFacturas } = useFacturas();
  const [query, setQuery] = useState('');
  const [usuario, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setSession(session);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFacturas(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Mostrar loader hasta que el usuario esté disponible
  if (!usuario) {
    return <p className="p-4 text-gray-600">Cargando usuario...</p>;
  }

  const facturasDelUsuario = facturas.filter(
    (factura) => factura.cliente?.usuarioId === usuario.id
  );

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Facturas</h1>
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
      ) : facturasDelUsuario.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron facturas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="backdrop-blur-md max-w-max mx-auto w-full hidden sm:block border border-gray-200 text-sm">
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
              {facturasDelUsuario.map((factura) => (
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
                  <td className="px-4 py-2 capitalize">{factura.metodoDePago}</td>
                  <td className="px-4 py-2">${factura.monto.toFixed(2)}</td>
                  <td className="px-4 py-2 flex justify-center gap-3 items-center">
                    <Link
                      href={`/dashboard/cliente/facturas/ver/${factura._id}`}
                      className="hover:underline"
                    >
                      <VisibilityIcon />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Vista para pantallas pequeñas */}
          <div className="sm:hidden flex flex-col gap-4 text-xs bg-white">
            {facturasDelUsuario.map((factura) => (
              <details
                key={factura._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-center cursor-pointer font-medium text-darkgreen">
                  <span>{factura.identificacion}</span>
                  <span className="text-right font-bold text-gray-800">
                    ${factura.monto.toFixed(2)}
                  </span>
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
                    <strong>Cliente:</strong> {factura.cliente?.nombre} {factura.cliente?.apellido}
                    <br />
                    <span className="text-xs text-gray-500">{factura.cliente?.email}</span>
                  </div>
                  <div className="self-center flex items-center justify-center gap-4 pt-2">
                    <Link
                      href={`/dashboard/admin/facturas/ver/${factura._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <VisibilityIcon />
                    </Link>
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
