'use client';

import AuthGuard from '@/components/AuthGuard';

export default function Layout({children}) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      {children}
    </AuthGuard>
  );
}
