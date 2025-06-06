'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession } from '@/utils/auth';

export default function AuthGuard({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();

      if (!session) {
        router.replace('/login');
        return;
      }

      const rolePath = '/dashboard/' + session.role;
      if (!pathname.startsWith(rolePath)) {
        router.replace(rolePath);
        return;
      }

      setLoading(false);
    }

    fetchSession();
  }, [pathname]);

  if (loading) return <p className="p-4">Verificando acceso...</p>;

  return children;
}
