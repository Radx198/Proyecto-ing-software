'use client';

import Link from 'next/link';
import { useProductos } from '@/hooks/useProductos';
import { useState, useEffect } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const { productos, loading, deleteProducto, fetchProductos } = useProductos();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProductos(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos Registrados</h1>
        <Link href="/dashboard/admin/productos/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">
          Registrar Producto
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre del producto..."
        className="mb-4 p-2 border w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id} className="border-t">
                <td className="p-2">{producto.nombre}</td>
                <td className="p-2">{producto.descripcion}</td>
                <td className="p-2">${producto.precio}</td>
                <td className="p-2">{producto.stock}</td>
                <td className="p-2">{producto.categoria}</td>
                <td className="p-2 space-x-2">
                  <Link href={`/dashboard/admin/productos/editar/${producto._id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button onClick={() => deleteProducto(producto._id)} className="text-red-600">
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
