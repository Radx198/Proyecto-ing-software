'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarCliente() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', apellido: '', dni: 0, email: '', telefono: '', direccion: '' });

  useEffect(() => {
    async function fetchCliente() {
      const res = await fetch(`/api/clientes/${id}`);
      const data = await res.json();
      setForm(data);
    }
    if (id) fetchCliente();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('../');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'apellido', 'dni', 'email', 'telefono', 'direccion'].map(field => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required={['nombre', 'apellido', 'email', 'dni'].includes(field)}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </main>
  );
}
