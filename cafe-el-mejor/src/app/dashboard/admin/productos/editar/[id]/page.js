'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarProducto() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });

  useEffect(() => {
    async function fetchProducto() {
      const res = await fetch(`/api/productos/${id}`);
      const data = await res.json();
      setForm({
        nombre: data.nombre,
        descripcion: data.descripcion || '',
        precio: data.precio,
        stock: data.stock,
        categoria: data.categoria || '',
      });
    }
    if (id) fetchProducto();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, precio: parseFloat(form.precio), stock: parseInt(form.stock) }),
    });
    router.push('/productos');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'descripcion', 'precio', 'stock', 'categoria'].map(field => (
          <input
            key={field}
            name={field}
            type={field === 'precio' || field === 'stock' ? 'number' : 'text'}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required={field !== 'descripcion' && field !== 'categoria'}
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </main>
  );
}
