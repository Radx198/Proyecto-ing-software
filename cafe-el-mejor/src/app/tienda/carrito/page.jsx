'use client';
import { useCarrito } from '@/context/CarritoContext';
import Header from '@/components/Header';
import { getSession } from '@/utils/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ShoppingBagOutlined } from '@mui/icons-material';
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
    return <>
      <Header />
      <main className="max-w-4xl place-items-center flex items-center justify-center flex-col mx-auto px-4 py-6 mt-24 gap-y-8">
        <h1 className='text-2xl font-bold'>Tu carrito está vacío!</h1>
        <div className='text-darkgreen'>
          <ShoppingBag size={'64'} />
        </div>
        <div className="mt-3">
          <Link className="text-neutral-900 bg-white p-2 border rounded-xl hover:bg-lightgreen transition-all font-semibold" href='/tienda'>Ir a la tienda</Link>
        </div>
      </main>
    </>
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
                  onClick={() => {item.cantidad < 10 ? actualizarCantidad(item.producto._id, item.cantidad + 1) : alert('Maximo 10 unidades por producto')}}
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
        <div className="flex items-center justify-center w-full mt-4 bg-darkgreen hover:bg-green-700 transition-colors text-white text-lg font-medium py-3 rounded-xl shadow-md">
          <Link className={'w-full'} href={'/tienda/carrito/checkout'}>
            <p className='w-full flex items-center justify-center gap-x-4'>
              Finalizar compra <ArrowRight />
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
