'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCarrito } from '@/context/CarritoContext';

export default function Page() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);

  const {
    carrito,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    loading,
  } = useCarrito();

  useEffect(() => {
    async function cargarProducto() {
      setCargando(true);
      try {
        const res = await fetch(`/api/productos/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    }
    cargarProducto();
  }, [id]);

  if (cargando || loading) return <p className="p-4">Cargando producto...</p>;
  if (!producto) return <p className="p-4">Producto no encontrado</p>;

  const enCarrito = carrito?.items?.find(item => item.producto._id === producto._id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 min-h-[700px]">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={300}
          height={300}
          className="rounded-md object-cover"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h1 className="text-2xl font-bold">{producto.nombre}</h1>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-xl font-semibold mt-4">${producto.precio.toLocaleString()}</p>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              Cantidad:
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                min={1}
                className="ml-2 border p-1 w-16"
              />
            </label>

            {!enCarrito ? (
              <button
                onClick={() => agregarProducto(producto._id, cantidad)}
                className="bg-darkgreen text-white px-4 py-2 rounded-md"
              >
                Agregar al carrito
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Ya en el carrito (cantidad: {enCarrito.cantidad})
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => actualizarCantidad(producto._id, cantidad)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Actualizar cantidad
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Quitar del carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
