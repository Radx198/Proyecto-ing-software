'use client';

import Link from 'next/link';
import { useProveedores } from '@/hooks/useProveedores';
import { useState, useEffect } from 'react';

export default function Page() {
  const { proveedores, loading, deleteProveedor, fetchProveedores } = useProveedores();
    const [query, setQuery] = useState('');
    useEffect(() => {
      const timeout = setTimeout(() => {
        fetchProveedores(query);
      }, 300);
      return () => clearTimeout(timeout);
    }, [query]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Proveedores Registrados</h1>
        <Link
          href="/dashboard/compras/proveedores/nuevo"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Registrar Proveedor
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
        <p className="text-gray-600">Cargando...</p>
      ) : proveedores.length === 0 ? (
        <p className="italic text-gray-500">No se encontraron proveedores.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="hidden sm:block w-max mx-auto border border-gray-200 text-sm backdrop-blur-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2 text-right">Dirección</th>
                <th className="px-4 py-2 text-center">Inicio de Contrato</th>
                <th className="px-4 py-2 text-center">Fin de Contrato</th>
                <th className="px-4 py-2 text-center">Ultima entrega</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{proveedor.nombreLegal}</td>
                  <td className="px-4 py-2 text-center">{proveedor.contacto}</td>
                  <td className="px-4 py-2 text-center">
                    {proveedor.fechaInicioContrato}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {proveedor.fechaFinContrato}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(proveedor.fechaUltimaEntrega).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}</td>
                  <td className="px-4 py-2 flex justify-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/dashboard/compras/proveedores/editar/${proveedor._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteProveedor(proveedor._id)}
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
            {proveedores.map((proveedor, index) => (
              <details
                key={proveedor._id}
                className="border border-gray-300 rounded-md p-3"
              >
                <summary className="flex justify-between items-center cursor-pointer font-medium text-darkgreen">
                  <span>{proveedor.nombreLegal}</span>
                  <span className="text-right font-bold text-gray-800">{proveedor.contacto}</span>
                </summary>

                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>Contrato:</strong>
                  </div>
                  <div>
                    {proveedor.fechaInicioContrato}
                    <br />
                    <span className="text-xs text-gray-500">{proveedor.fechaFinContrato}</span>
                  </div>
                  <div>
                    <strong>Ultima entrega:</strong>
                  </div>
                  <div>
                    {new Date(proveedor.fechaUltimaEntrega).toLocaleDateString('es-AR', {
                      year: 'numeric', day: '2-digit', month: '2-digit',
                    })}
                  </div>
                  <div>
                    <strong>Productos:</strong>
                    <ul className="list-disc ml-5">
                      {proveedor.productos.map((item, i) => (
                        <li key={i}>
                          {item.producto?.nombre || 'Producto eliminado'}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <Link
                      href={`/dashboard/compras/proveedores/editar/${proveedor._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteOrden(proveedor._id)}
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

