'use client';
import Link from 'next/link';
import { useProveedores } from '@/hooks/useProveedores';

export default function ProductosPage() {
  const { proveedores, loading, deleteProveedor } = useProveedores();

  return (
    <main className="p-4 max-w-5xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Proveedores</h1>
        <Link href="proveedores/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">
          Registrar Proveedor
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
            {proveedores.map((proveedor) => (
              <tr key={proveedor._id} className="border-t">
                <td className="p-2">{proveedor.nombre}</td>
                <td className="p-2 text-right">${proveedor.precio.toFixed(2)}</td>
                <td className="p-2 text-center">{proveedor.stock}</td>
                <td className="p-2 text-center space-x-2">
                  <Link href={`/productos/editar/${proveedor._id}`} className="text-blue-600 underline">
                    Editar
                  </Link>
                  <button onClick={() => deleteProveedor(proveedor._id)} className="text-red-600">
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
