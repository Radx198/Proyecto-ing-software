'use client';
import Link from 'next/link';
import { useProductos } from '@/hooks/useProductos';

export default function ProductosPage() {
  const { productos, loading, deleteProducto } = useProductos();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos</h1>
        <Link href="/productos/nuevo" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      {loading ? <p>Cargando...</p> : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p._id} className="border-t">
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td className="space-x-2">
                  <a href={`/productos/editar/${p._id}`} className="text-blue-600 underline">Editar</a>
                  <button onClick={() => deleteProducto(p._id)} className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
