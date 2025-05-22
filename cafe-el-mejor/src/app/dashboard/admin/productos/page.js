'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '@/utils/productos';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const handleDelete = (id) => {
    deleteProducto(id);
    setProductos(getProductos());
  };

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/productos/nuevo" className="bg-green-600 text-white px-4 py-2 rounded">Nuevo</Link>
      </div>

      <input
        className="input mb-4 w-full"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <ul className="space-y-2">
        {filtrados.map(producto => (
          <li key={producto.id} className="border p-4 rounded shadow flex justify-between">
            <div>
              <h2 className="font-bold">{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p>Stock: {producto.stock} | Precio: ${producto.precio}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/productos/${producto.id}/editar`} className="text-blue-600">Editar</Link>
              <button onClick={() => handleDelete(producto.id)} className="text-red-600">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
