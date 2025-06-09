'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function Page() {
  const searchParams = useSearchParams();
  const mensaje = searchParams.get('msg');

  return (
    <>
      <Header />
      <main className="max-w-4xl place-items-center flex items-center justify-center flex-col mx-auto px-4 py-6 mt-24 gap-y-8">
        <h1 className='text-2xl font-bold'>
          {mensaje || 'Tu pedido fue concretado con éxito!'}
        </h1>
        <div className='text-darkgreen'>
          <CheckCircle size={'128'} />
        </div>
        <div className="mt-3">
          <Link
            className="text-neutral-900 bg-white p-2 border rounded-xl hover:bg-lightgreen transition-all font-semibold"
            href='/dashboard/cliente'
          >
            Ir al dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
