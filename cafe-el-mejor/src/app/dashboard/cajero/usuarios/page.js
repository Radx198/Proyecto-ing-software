'use client';

import Link from 'next/link';
import { useUsuarios } from '@/hooks/useUsuarios';
import { useState, useEffect } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const { usuarios, loading, deleteUsuario, fetchUsuarios } = useUsuarios();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsuarios(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Link
          href="/dashboard/admin/usuarios/nuevo"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Registrar Usuario
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o correo..."
        className="mb-6 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-darkgreen"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-600">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-gray-500 italic">No se encontraron usuarios.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="hidden sm:block w-max mx-auto border border-gray-200 text-sm backdrop-blur-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    {usuario.nombre} {usuario.apellido}
                  </td>
                  <td className="px-4 py-2">{usuario.mail}</td>
                  <td className="px-4 py-2">
                    {usuario.telefono || <span className="text-gray-400 italic">No provisto</span>}
                  </td>
                  <td className="px-4 py-2">
                    {usuario.direccion || <span className="text-gray-400 italic">No provista</span>}
                  </td>
                  <td className="px-4 py-2 capitalize">{usuario.role}</td>
                  <td className="px-4 py-2 flex gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/admin/usuarios/editar/${usuario._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteUsuario(usuario._id)}
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
            {usuarios.map((usuario, index) => (
              <details
                key={usuario._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-start sm:items-center gap-y-1 cursor-pointer font-medium text-darkgreen">
                  <span className="break-words text-sm font-bold text-gray-800">{usuario.nombre} {usuario.apellido}</span>
                  <span className="text-right ">{usuario.role}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Teléfono:</strong> {usuario.telefono || 'No provisto'}
                  </div>
                  <div>
                    <strong>Dirección:</strong>{' '}
                    {usuario.direccion || 'No provista'}
                  </div>
                  <div>
                    <strong>Email:</strong>{' '}
                    {usuario.mail || 'No provista'}
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <Link
                      href={`/dashboard/admin/usuarios/editar/${usuario._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCliente(usuario._id)}
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
