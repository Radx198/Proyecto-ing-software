'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/utils/auth';

export default function AuthGuard({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();

    /* if (!session || !session.token) {
        router.replace('/login');
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(session.usuario?.role)) {
        router.replace('/unauthorized');
        return;
      }*/

      setLoading(false);
    }

    fetchSession();
  }, [router, allowedRoles]);

  if (loading) return <p className="p-4">Verificando acceso...</p>;

  return children;
}
