'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function Page() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    stock: '',
    categoria: '',
  });

  const [isImageValid, setIsImageValid] = useState(true);
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'imagen') {
      setIsImageValid(true); // Resetear validez al cambiar la URL
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
      }),
    });
    router.push('/dashboard/admin/productos');
  };

  const fields = ['nombre', 'descripcion', 'precio', 'imagen', 'stock', 'categoria'];

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field}>
            <input
              name={field}
              type={field === 'precio' || field === 'stock' ? 'number' : 'text'}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required={!['descripcion', 'categoria', 'imagen'].includes(field)}
              className="w-full p-2 border rounded"
            />

            {/* Previsualización de imagen */}
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </main>
  );
}
