'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/auth';
import Link from 'next/link';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
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
        <button type="submit" className="bg-darkgreen text-white px-4 py-2 rounded w-full">
          Ingresar
        </button>
      </form>
    </div>
  );
}
