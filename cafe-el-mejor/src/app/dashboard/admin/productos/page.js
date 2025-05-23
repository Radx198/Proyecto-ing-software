'use client';
import Link from 'next/link';
import { useProductos } from '@/hooks/useProductos';

export default function Page() {
  const { productos, loading, deleteProducto } = useProductos();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Productos</h1>
        <Link href="/productos/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">
          Registrar Producto
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-center">Stock</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.nombre}</td>
                <td className="p-2 text-right">${p.precio.toFixed(2)}</td>
                <td className="p-2 text-center">{p.stock}</td>
                <td className="p-2 text-center space-x-2">
                  <Link href={`/productos/editar/${p._id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button onClick={() => deleteProducto(p._id)} className="text-red-600">
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
