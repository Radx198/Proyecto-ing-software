'use client';
import Link from 'next/link';
import { useClientes } from '@/hooks/useClientes';
import { useState, useEffect } from 'react';

export default function Page() {
  const { clientes, loading, deleteCliente, fetchClientes } = useClientes();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchClientes(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Link href="/dashboard/admin/clientes/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition">
          Registrar Cliente
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre del producto..."
        className="mb-6 p-2 border rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <p className="text-gray-600 italic">No hay clientes registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full hidden sm:block w-max mx-auto border border-gray-200 text-sm backdrop-blur-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{c.nombre} {c.apellido}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">
                    {c.telefono || <span className="text-gray-400 italic">No provisto</span>}
                  </td>
                  <td className="px-4 py-2">
                    {c.direccion || <span className="text-gray-400 italic">No provista</span>}
                  </td>
                  <td className="px-4 py-2 flex gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/admin/clientes/editar/${c._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCliente(c._id)}
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
            {clientes.map((cliente, index) => (
              <details
                key={cliente._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-1 cursor-pointer font-medium text-darkgreen">
                  <span className="break-words max-w-[80%]">{cliente.nombre} {cliente.apellido}</span>
                  <span className="text-right break-all text-sm font-bold text-gray-800">{cliente.email}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Teléfono:</strong> {cliente.telefono || 'No provisto'}
                  </div>
                  <div>
                    <strong>Dirección:</strong>{' '}
                    {cliente.direccion || 'No provista'}
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <Link
                      href={`/dashboard/admin/clientes/editar/${cliente._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCliente(cliente._id)}
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
