'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, contraseña: password }),
    });

    if (res.ok) {
      const user = await res.json();
      if (user.role === 'admin') router.push('/dashboard/admin');
      else if (user.role === 'cajero') router.push('/dashboard/cajero');
      else if (user.role === 'personalDeCompra') router.push('/dashboard/compras');
      else router.push('/dashboard/cliente');
    } else {
      const data = await res.json();
      setError(data.message || 'Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex lg:items-start items-center justify-start bg-gray-100 max-h-screen overflow-hidden">
      <div className='flex-1 hidden lg:block'>
        <Image alt='' width={4016} height={6016} src={"/pexels-chevanon-302896.jpg"} />
      </div>
      <form onSubmit={handleLogin} className="p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <div className='flex'>
          <button type="submit" className="hover:bg-lightgreen hover:text-neutral-950 bg-darkgreen text-white px-4 py-2 rounded w-full">
            Ingresar
          </button>
          <p className="text-darkgreen px-4 py-2 w-full">
            Recuperar usuario/contraseña
          </p>
        </div>
      </form>
    </div>
  );
}
