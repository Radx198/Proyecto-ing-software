'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarProducto() {
    const [isImageValid, setIsImageValid] = useState(true);

  const handleImageChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'imagen') {
      setIsImageValid(true); // Resetear validez al cambiar la URL
    }
  };
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen: '' });

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
        imagen: data.imagen || ''
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
    router.push('../');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'descripcion', 'precio', 'stock', 'categoria', 'imagen'].map(field => (
          <div key={field}>
            <input
              key={field}
              name={field}
              type={field === 'precio' || field === 'stock' ? 'number' : 'text'}
              min={field === 'precio' || field === 'stock' ? 1 : undefined}
              placeholder={field}
              value={form[field]}
              onChange={field === 'image' ? handleImageChange : handleChange}
              required={field !== 'descripcion' && field !== 'categoria'}
              className="w-full p-2 border rounded"
            />
            {field === 'imagen' && form.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Previsualización:</p>
                {isImageValid ? (
                  <img
                    src={form.imagen}
                    alt="Previsualización"
                    className="w-full max-h-64 object-contain border rounded"
                    onError={() => setIsImageValid(false)}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center border rounded bg-gray-100 text-gray-400">
                    <ImageNotSupportedIcon style={{ fontSize: 64 }} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </main>
  );
}
