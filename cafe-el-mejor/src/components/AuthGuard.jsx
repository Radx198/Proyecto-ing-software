'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/utils/auth';

export default function AuthGuard({ children, allowedRoles = [] }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(session.role)) {
      router.push('/unauthorized');
      return;
    }

    setIsAllowed(true);
  }, [allowedRoles, router]);

  if (!isAllowed) return null; // O podés mostrar un spinner de carga

  return <>{children}</>;
}
