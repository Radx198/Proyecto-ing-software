// components/OrdenForm.jsx
'use client';

import { useState, useEffect } from 'react';

export default function OrdenForm({ initialData = null, onSubmit }) {
  const [cliente, setCliente] = useState(initialData?.cliente || '');
  const [productos, setProductos] = useState(initialData?.productos || '');
  const [metodoPago, setMetodoPago] = useState(initialData?.metodoPago || '');
  const [precioTotal, setPrecioTotal] = useState(initialData?.precioTotal || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cliente, productos, metodoPago, precioTotal });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Cliente"
        className="w-full p-2 border rounded"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Productos (ej: Pan x2, Tarta x1)"
        className="w-full p-2 border rounded"
        value={productos}
        onChange={(e) => setProductos(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Método de pago"
        className="w-full p-2 border rounded"
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio total"
        className="w-full p-2 border rounded"
        value={precioTotal}
        onChange={(e) => setPrecioTotal(e.target.value)}
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar Orden
      </button>
    </form>
  );
}
