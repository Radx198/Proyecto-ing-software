'use client';

import { useState } from 'react';

export default function ClienteForm({ initialData = {}, onSubmit }) {
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cliente);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="nombre" placeholder="Nombre" className="input" value={cliente.nombre} onChange={handleChange} required />
      <input name="email" placeholder="Email" className="input" value={cliente.email} onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" className="input" value={cliente.telefono} onChange={handleChange} required />
      <input name="direccion" placeholder="Dirección" className="input" value={cliente.direccion} onChange={handleChange} required />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Guardar</button>
    </form>
  );
}
