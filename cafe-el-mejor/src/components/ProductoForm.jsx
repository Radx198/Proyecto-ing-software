'use client';

import { useState, useEffect } from 'react';

export default function ProductoForm({ initialData = {}, onSubmit }) {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    stock: 0,
    precio: 0,
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md flex flex-col">
      <input name="id" type="hidden" value={producto.id} />
      <label htmlFor="nombre">
        <p>Nombre</p>
        <input name="nombre" className="input border-neutral-400 border rounded p-2" value={producto.nombre} onChange={handleChange} required />
      </label>
      <label htmlFor="descripcion">
        <p>Descripcion</p>
        <textarea name="descripcion" className="input border-neutral-400 border rounded p-2" value={producto.descripcion} onChange={handleChange} required />
      </label>
      <label htmlFor="stock">
        <p>Stock</p>
        <input name="stock" type="number" className="input border-neutral-400 border rounded p-2 max-w-24" placeholder="Stock" value={producto.stock} onChange={handleChange} required />
      </label>
      <label htmlFor="precio">
        <p>Precio</p>
        <input name="precio" type="number" className="input border-neutral-400 border rounded p-2 max-w-24"  placeholder="Precio" value={producto.precio} onChange={handleChange} required />
      </label>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Guardar</button>
    </form>
  );
}
