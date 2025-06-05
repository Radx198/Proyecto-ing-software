'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditarUsuarioPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    telefono: '',
    direccion: '',
    role: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/usuarios/${id}`);
        const data = await res.json();
        if (res.ok) {
          setForm(data);
        } else {
          throw new Error(data.message || 'Error al cargar el usuario');
        }
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el usuario');
      }
    };
    if (id) fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.mail || !form.telefono || !form.direccion || !form.role) {
      return setError('Todos los campos son obligatorios');
    }

    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/dashboard/admin/usuarios');
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al actualizar el usuario');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Editar Usuario</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'apellido', 'mail', 'telefono', 'direccion'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
          />
        ))}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Seleccionar Rol</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
          <option value="cajero">Cajero</option>
          <option value="personalDeCompra">Personal de Compra</option>
          <option value="invitado">Invitado</option>
        </select>

        <button
          type="submit"
          className="bg-darkgreen text-white px-4 py-2 rounded hover:bg-lightgreen"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}
