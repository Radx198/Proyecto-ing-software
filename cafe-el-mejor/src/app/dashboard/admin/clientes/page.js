'use client';
import Link from 'next/link';
import { useClientes } from '@/hooks/useClientes';

export default function ClientesPage() {
  const { clientes, loading, deleteCliente } = useClientes();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Clientes</h1>
        <Link href="/clientes/nuevo" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      {loading ? <p>Cargando...</p> : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c._id} className="border-t">
                <td>{c.nombre} {c.apellido}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td className="space-x-2">
                  <a href={`/clientes/editar/${c._id}`} className="text-blue-600 underline">Editar</a>
                  <button onClick={() => deleteCliente(c._id)} className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
