'use client';
import Link from 'next/link';
import { useClientes } from '@/hooks/useClientes';

export default function Page() {
  const { clientes, loading, deleteCliente } = useClientes();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Clientes</h1>
        <Link href="clientes/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">
          Registrar Cliente
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2">{c.nombre} {c.apellido}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefono || <span className="text-gray-400 italic">No provisto</span>}</td>
                <td className="p-2">{c.direccion || <span className="text-gray-400 italic">No provista</span>}</td>
                <td className="p-2 space-x-2">
                  <Link href={`/clientes/editar/${c._id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button onClick={() => deleteCliente(c._id)} className="text-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
