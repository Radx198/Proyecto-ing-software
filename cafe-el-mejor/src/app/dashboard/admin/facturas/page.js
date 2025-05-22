'use client';
import Link from 'next/link';
import { useFacturas } from '@/hooks/useFacturas';

export default function Page() {
  const { facturas, loading, deleteOrden } = useFacturas();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Órdenes de Compra</h1>
        <Link href="facturas/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Registrar Orden</Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Factura N°</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Método de Pago</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura, index) => (
              <tr key={factura._id} className="border-t">
                <td className="p-2 text-center">{index + 1}</td>

                <td className="p-2">
                  {factura.cliente?.nombre} {factura.cliente?.apellido}
                  <br />
                  <span className="text-gray-600 text-xs">{factura.cliente?.email}</span>
                </td>

                <td className="p-2 capitalize">{factura.fecha}</td>

                <td className="p-2 capitalize">{factura.metodoDePago}</td>

                <td className="p-2">${factura.monto.toFixed(2)}</td>

                <td className="p-2 space-x-2">
                  <Link href={`/facturas/editar/${factura._id}`} className="text-blue-600 underline">Editar</Link>
                  <button onClick={() => deleteOrden(factura._id)} className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}