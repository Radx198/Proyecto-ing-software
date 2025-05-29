'use client';

import AuthGuard from '@/components/AuthGuard';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className='relative w-full sm:pt-0 pt-10'>
        {children}
        <div className='opacity-10 overflow-hidden w-full h-full max-h-screen absolute top-0 left-0 mx-auto right-0 flex items-center justify-center bg-white z-[-1]'>
          <Image width={1024} height={1024} alt='logo' src={'/logo.png'} />
        </div>
      </div>
    </AuthGuard>
  );
}
