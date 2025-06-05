'use client';

import { useEffect, useState } from 'react';
import { useCarrito } from '@/hooks/useCarrito';
import Image from 'next/image';
import Link from 'next/link';

export default function CarritoPage() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { obtenerCarrito, vaciarCarrito } = useCarrito();

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      const data = await obtenerCarrito();
      setItems(data);
      setCargando(false);
    }
    cargar();
  }, []);

  const total = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  if (cargando) return <p className="p-4">Cargando carrito...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex gap-4 border-b pb-4">
                <Image src={item.producto.imagen} width={80} height={80} alt={item.producto.nombre} />
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="font-semibold">{item.producto.nombre}</h2>
                    <p className="text-gray-500">{item.producto.descripcion}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      ${item.producto.precio.toLocaleString()} x {item.cantidad}
                    </p>
                    <p className="font-semibold">
                      Subtotal: ${(item.producto.precio * item.cantidad).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toLocaleString()}</p>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await vaciarCarrito();
                  setItems([]);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Vaciar carrito
              </button>
              <Link href="/checkout">
                <button className="bg-darkgreen text-white px-4 py-2 rounded-md">
                  Finalizar compra
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
