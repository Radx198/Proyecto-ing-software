'use client';

import AuthGuard from '@/components/AuthGuard';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className='relative flex-1 sm:pt-0 pt-10'>
        {children}
        <div className='opacity-5 min-w-screen absolute top-0 left-0 mx-auto right-0 w-full h-full flex items-center justify-center bg-white z-[-1]'>
          <Image width={1024} height={1024} alt='logo' src={'/logo.png'} />
        </div>
      </div>
    </AuthGuard>
  );
}
