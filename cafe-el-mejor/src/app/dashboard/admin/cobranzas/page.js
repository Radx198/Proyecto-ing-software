'use client';
import Link from 'next/link';
import { useCobranzas } from '@/hooks/useCobranzas';

export default function CobranzasPage() {
  const { cobranzas, loading, deleteCobranza } = useCobranzas();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Cobranzas</h1>
        <Link href="/cobranzas/nueva" className="bg-green-600 text-white px-4 py-2 rounded">Nueva</Link>
      </div>

      {loading ? <p>Cargando...</p> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Identificación</th>
              <th>Cliente</th>
              <th>Método de pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cobranzas.map(c => (
              <tr key={c._id} className="border-t">
                <td>{c.identificacion}</td>
                <td>{c.cliente}</td>
                <td>{c.metodoPago}</td>
                <td className="space-x-2">
                  <button onClick={() => deleteCobranza(c._id)} className="text-red-600">Eliminar</button>
                  <a href={`/cobranzas/editar/${c._id}`} className="text-blue-600 underline">Editar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
