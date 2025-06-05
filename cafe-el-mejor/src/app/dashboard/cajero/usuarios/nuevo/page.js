'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearUsuarioAdmin() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: '',
    confirmarContraseña: '',
    telefono: '',
    direccion: '',
    role: 'cliente',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.contraseña !== form.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al crear el usuario');

      const data = await res.json();
      alert('Usuario creado correctamente');
      router.push('/dashboard/admin/usuarios');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Crear nuevo usuario</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="mail" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" type="email" required />
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="admin">Admin</option>
          <option value="cajero">Cajero</option>
          <option value="personalDeCompra">Personal de Compra</option>
          <option value="cliente">Cliente</option>
        </select>
        <input name="contraseña" placeholder="Contraseña" onChange={handleChange} className="w-full p-2 border rounded" type="password" required />
        <input name="confirmarContraseña" placeholder="Confirmar Contraseña" onChange={handleChange} className="w-full p-2 border rounded" type="password" required />
        <button type="submit" className="bg-darkgreen text-white px-4 py-2 rounded w-full hover:bg-lightgreen hover:text-black">
          Crear usuario
        </button>
      </form>
    </div>
  );
}
