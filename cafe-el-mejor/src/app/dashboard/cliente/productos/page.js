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
    <main className="p-4 max-w-6xl mx-auto flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">Productos Disponibles</h1>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre del producto..."
        className="mb-6 p-2 border rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div key={producto._id} className="bg-white border border-gray-400 rounded-lg shadow hover:shadow-lg transition">
              <div className="h-40 bg-darkgreen flex items-center justify-center rounded-t-lg">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-40 h-40 object-contain mb-3"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-2">{producto.descripcion}</p>
                <p className="text-lg font-semibold text-darkgreen mb-1">${producto.precio}</p>
                <p className="text-sm text-gray-500 mb-2">Stock: {producto.stock}</p>
                <p className="text-sm text-gray-500 mb-4">Categoría: {producto.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
