'use client';

import AuthGuard from '@/components/AuthGuard';

export default function ClienteDashboard() {
  return (
    <AuthGuard allowedRoles={['cliente']}>
      <div className="flex">
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Bienvenido Cliente</h1>
          <p>Desde aquí podés consultar tus facturas y pagos.</p>
        </main>
      </div>
    </AuthGuard>
  );
}
