'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaCobranzaPage() {
  const [form, setForm] = useState({
    identificacion: '',
    metodoPago: '',
    producto: '',
    cliente: '',
    fecha: '',
  });

  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/cobranzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, fecha: new Date(form.fecha) }),
    });
    router.push('/cobranzas');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrar Cobranza</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['identificacion', 'metodoPago', 'producto', 'cliente', 'fecha'].map(field => (
          <input
            key={field}
            name={field}
            type={field === 'fecha' ? 'date' : 'text'}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </main>
  );
}
