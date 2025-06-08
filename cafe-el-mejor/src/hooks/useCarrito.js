'use client';

import { useState, useEffect } from 'react';

export function useCarrito() {
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

  return {
    obtenerCarrito,
    carrito,
    loading,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
  };
}
