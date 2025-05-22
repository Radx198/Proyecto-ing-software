'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarCobranzaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    identificacion: '',
    metodoPago: '',
    producto: '',
    cliente: '',
    fecha: '',
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/cobranzas/${id}`);
      const data = await res.json();
      setForm({
        identificacion: data.identificacion,
        metodoPago: data.metodoPago,
        producto: data.producto,
        cliente: data.cliente,
        fecha: data.fecha?.slice(0, 10), // ISO date for input type="date"
      });
    }
    if (id) fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/cobranzas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, fecha: new Date(form.fecha) }),
    });
    router.push('/cobranzas');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Cobranza</h1>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </main>
  );
}
