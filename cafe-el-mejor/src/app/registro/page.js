'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    telefono: '',
    direccion: '',
    contraseña: '',
    confirmarContraseña: '',
    role: 'cliente',
    dni: 0,
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    const {
      nombre, apellido, mail, telefono, direccion, contraseña, confirmarContraseña, role
    } = form;

    if (Object.values(form).some(val => val === '')) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError('Error al registrar el usuario.');
        return;
      }

      const usuarioCreado = await res.json();

      if (role === 'cliente') {
        await fetch('/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            apellido,
            mail,
            telefono,
            direccion,
            usuarioId: usuarioCreado._id,
            dni
          }),
        });
      }

      // Redireccionar
      switch (usuarioCreado.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'cajero':
          router.push('/dashboard/cajero');
          break;
        case 'personalDeCompra':
          router.push('/dashboard/compras');
          break;
        default:
          router.push('/dashboard/cliente');
          break;
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="min-h-screen flex lg:items-start items-center justify-start bg-gray-100 max-h-screen overflow-hidden">
      <div className="flex-1 hidden lg:block">
        <Image alt="" width={4016} height={6016} src="/pexels-chevanon-302896.jpg" />
      </div>
      <form onSubmit={handleSubmit} className="p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Registro</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {['nombre', 'apellido', 'mail', 'telefono', 'direccion'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}
        <input
          type="password"
          placeholder="Contraseña"
          name="contraseña"
          value={form.contraseña}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          name="confirmarContraseña"
          value={form.confirmarContraseña}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="hover:bg-lightgreen hover:text-neutral-950 bg-darkgreen text-white px-4 py-2 rounded w-full"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
