'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoCliente() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', direccion: '', dni: 0 });
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/dashboard/admin/clientes');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'apellido', 'email', 'telefono', 'direccion'].map(field => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required={['nombre', 'apellido', 'email'].includes(field)}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </main>
  );
}
