'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { loginUser } from '@/utils/auth';

export default function Page() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const user = await loginUser(mail, password);

    if (user) {
      if (user.role === 'admin') router.push('/dashboard/admin');
      else if (user.role === 'cajero') router.push('/dashboard/cajero');
      else if (user.role === 'personalDeCompra') router.push('/dashboard/compras');
      else router.push('/dashboard/cliente');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-100 max-h-screen overflow-hidden">
      <div className=''>
        <Image priority alt='' className='max-w-sm' width={1024} height={1024} src={"/logo.png"} />
      </div>
      <form onSubmit={handleLogin} className="max-w-xl p-6">
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
        </div>
        <div className='mt-2'>
          <Link href={"/registro"} className="text-darkgreen py-2 w-full">
            ¿No tenes cuenta? Registrarse
          </Link>
        </div>
      </form>
    </div>
  );
}
