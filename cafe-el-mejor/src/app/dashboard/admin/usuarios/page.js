'use client';

import Link from 'next/link';
import { useUsuarios } from '@/hooks/useUsuarios';

export default function Page() {
  const { usuarios, loading, deleteUsuario } = useUsuarios();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Usuarios Registrados</h1>
        <Link href="/dashboard/admin/usuarios/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">
          Registrar Usuario
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id} className="border-t">
                <td className="p-2">{usuario.nombre} {usuario.apellido}</td>
                <td className="p-2">{usuario.mail}</td>
                <td className="p-2">{usuario.telefono}</td>
                <td className="p-2">{usuario.direccion}</td>
                <td className="p-2 capitalize">{usuario.role}</td>
                <td className="p-2 space-x-2">
                  <Link href={`/dashboard/admin/usuarios/editar/${usuario._id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button onClick={() => deleteUsuario(usuario._id)} className="text-red-600">
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
