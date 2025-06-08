'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCarrito } from '@/context/CarritoContext';
import { Loader2 } from 'lucide-react'; // Si usás iconos
import Header from '@/components/Header';

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

  const enCarrito = carrito?.items?.find(
    (item) => item.producto._id === producto?._id
  );

  if (cargando || loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-3 text-gray-600 text-lg">Cargando producto...</span>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center text-gray-500 py-10">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <>
    <Header />
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            priority
            />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {producto.nombre}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {producto.descripcion}
          </p>
          <p className="text-2xl text-darkgreen font-bold">
            ${producto.precio.toLocaleString()}
          </p>

          <div className="space-y-4">
            <label className="flex flex-col font-medium text-gray-700">
              Cantidad
              <input
                type="number"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(Math.max(1, parseInt(e.target.value)))
                }
                min={1}
                className="mt-1 w-24 border border-gray-300 rounded-md px-3 py-2 text-center text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-darkgreen"
                />
            </label>

            {!enCarrito ? (
              <button
              onClick={() => agregarProducto(producto._id, cantidad)}
              className="w-full bg-darkgreen hover:bg-green-700 transition-colors text-white text-lg font-medium py-3 rounded-xl shadow-md"
              >
                Agregar al carrito
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Ya en el carrito (cantidad actual: {enCarrito.cantidad})
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => actualizarCantidad(producto._id, cantidad)}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-xl shadow-md"
                    >
                    Actualizar cantidad
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto._id)}
                    className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-3 rounded-xl shadow-md"
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
            </>
  );
}
