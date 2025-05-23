'use client';
import Link from 'next/link';
import { useCobranzas } from '@/hooks/useCobranzas';

export default function Page() {
  const { cobranzas, loading, deleteCobranza } = useCobranzas();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tickets de Cobranza</h1>
        <Link href="cobranzas/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Registrar Cobranza</Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Ticket N°</th>
              <th className="p-2">Productos</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Método de Pago</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {cobranzas.map((cobranza, index) => (
              <tr key={cobranza._id} className="border-t">
                <td className="p-2 text-center">{index + 1}</td>

                <td className="p-2">
                  <ul className="list-disc ml-4">
                    {cobranza.productos.map((item, i) => (
                      <li key={i}>
                        {item.producto?.nombre || 'Producto eliminado'} x {item.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="p-2">
                  {cobranza.cliente?.nombre} {cobranza.cliente?.apellido}
                  <br />
                  <span className="text-gray-600 text-xs">{cobranza.cliente?.email}</span>
                </td>

                <td className="p-2 capitalize">{cobranza.metodoDePago}</td>

                <td className="p-2">{cobranza.fecha}</td>

                <td className="p-2">${cobranza.monto.toFixed(2)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}