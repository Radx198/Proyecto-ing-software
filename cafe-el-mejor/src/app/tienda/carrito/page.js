'use client';
import FinalizarCompra from '@/components/FinalizarCompraForm';
import { useCarrito } from '@/context/CarritoContext';
import Header from '@/components/Header';
import { getSession } from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function Page() {
  const [usuario, setSession] = useState(null);
  useEffect(() => {
    async function fetchSession() {
      const usuario = await getSession();
      setSession(usuario);
      console.log(usuario)
    }
    fetchSession();
  }, [])
  const {
    carrito,
    loading,
    actualizarCantidad,
    eliminarProducto,
  } = useCarrito();

  if (loading) return <p className="p-4">Cargando carrito...</p>;

  if (!carrito || carrito.items.length === 0) {
    return <p className="p-4 text-gray-600">Tu carrito está vacío</p>;
  }

  const total = carrito.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>

        <ul className="space-y-4">
          {carrito.items.map((item) => (
            <li
              key={item.producto._id}
              className="border border-gray-300 rounded-md p-4 flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold">{item.producto.nombre}</h3>
              <p className="text-gray-600">Precio unitario: ${item.producto.precio.toLocaleString()}</p>
              <p className="text-gray-700 font-medium">
                Subtotal: ${(item.producto.precio * item.cantidad).toLocaleString()}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    item.cantidad > 1
                      ? actualizarCantidad(item.producto._id, item.cantidad - 1)
                      : eliminarProducto(item.producto._id)
                  }
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-medium">{item.cantidad}</span>
                <button
                  onClick={() => actualizarCantidad(item.producto._id, item.cantidad + 1)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => eliminarProducto(item.producto._id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <FinalizarCompra clienteId={usuario.id} />
      </main>
    </>
  );
}
