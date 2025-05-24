'use client';

import Link from 'next/link';
import { useFacturas } from '@/hooks/useFacturas';

export default function FacturasPage() {
  const { facturas, loading, deleteFactura } = useFacturas();

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

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : facturas.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron facturas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 text-center">Factura N°</th>
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
                  <td className="px-4 py-2 text-center">{index + 1}</td>

                  <td className="px-4 py-2">
                    {factura.cliente?.nombre} {factura.cliente?.apellido}
                    <br />
                    <span className="text-gray-600 text-xs">{factura.cliente?.email}</span>
                  </td>

                  <td className="px-4 py-2 capitalize">{factura.fecha}</td>
                  <td className="px-4 py-2 capitalize">{factura.metodoDePago}</td>
                  <td className="px-4 py-2">${factura.monto.toFixed(2)}</td>

                  <td className="px-4 py-2 flex justify-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/admin/facturas/editar/${factura._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteFactura(factura._id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
