'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCarrito();
  }, []);

  async function obtenerCarrito() {
    setLoading(true);
    try {
      const res = await fetch('/api/carrito');
      if (!res.ok) throw new Error('Error al obtener el carrito');
      const data = await res.json();
      setCarrito(data);
    } catch (err) {
      setCarrito({ items: [] });
    } finally {
      setLoading(false);
    }
  }

  async function agregarProducto(productoId, cantidad = 1) {
    const res = await fetch('/api/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productoId, cantidad }),
    });
    if (res.ok) await obtenerCarrito();
  }

  async function actualizarCantidad(productoId, cantidad) {
    const res = await fetch(`/api/carrito/${productoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad }),
    });
    if (res.ok) await obtenerCarrito();
  }

  async function eliminarProducto(productoId) {
    const res = await fetch(`/api/carrito/${productoId}`, {
      method: 'DELETE',
    });
    if (res.ok) await obtenerCarrito();
  }

  async function finalizarCompra(clienteId, metodoDePago) {
    if (!carrito || carrito.items.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const productos = carrito.items.map(item => ({
      producto: item.producto._id,
      cantidad: item.cantidad,
    }));

    const res = await fetch('/api/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente: clienteId,
        productos,
        metodoDePago,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al finalizar la compra');
    }

    // Limpiar carrito localmente (podés implementar endpoint para limpiar en backend si querés)
    setCarrito({ items: [] });

    return data; // Devuelve la orden creada
  }


  return (
    <CarritoContext.Provider
      value={{
        carrito,
        loading,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        finalizarCompra
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
