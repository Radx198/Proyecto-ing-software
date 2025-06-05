'use client';

import { useCarrito } from '@/context/CarritoContext';

export default function Page() {
  const {
    carrito,
    loading,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
  } = useCarrito();

  if (loading) return <p>Cargando carrito...</p>;
  if (!carrito || carrito.items.length === 0) {
    return <p>Tu carrito está vacío</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Carrito de compras</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {carrito.items.map((item) => (
          <li
            key={item.producto._id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <h3>{item.producto.nombre}</h3>
            <p>Precio: ${item.producto.precio}</p>
            <p>Cantidad: {item.cantidad}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => actualizarCantidad(item.producto._id, item.cantidad + 1)}>
                +
              </button>
              <button
                onClick={() =>
                  item.cantidad > 1
                    ? actualizarCantidad(item.producto._id, item.cantidad - 1)
                    : eliminarProducto(item.producto._id)
                }
              >
                -
              </button>
              <button onClick={() => eliminarProducto(item.producto._id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
