'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginUser(username, password);
    if (user) {
      if (user.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/cliente');
      }
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex lg:items-start items-center justify-start bg-gray-100 max-h-screen overflow-hidden">
      <div className='flex-1 hidden lg:block'>
        <Image alt='' width={4016} height={6016} src={"/pexels-chevanon-302896.jpg"}/>
      </div>
      <form onSubmit={handleLogin} className="p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
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
