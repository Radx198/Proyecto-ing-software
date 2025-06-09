'use client';
import FinalizarCompra from '@/components/FinalizarCompraForm';
import { useCarrito } from '@/context/CarritoContext';
import Header from '@/components/Header';
import { getSession } from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function Page() {
  const [usuario, setSession] = useState(null);
  useEffect(() => {
    async function fetchSession() {
      const usuario = await getSession();
      setSession(usuario);
    }
    fetchSession();
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <FinalizarCompra clienteId={usuario?.id} />
      </main>
    </>
  );
}
