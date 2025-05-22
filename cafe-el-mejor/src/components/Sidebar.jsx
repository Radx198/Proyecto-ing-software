'use client';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


import Link from 'next/link';
import { getSession, logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push('/login');
    } else {
      setRole(session.role);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const commonLinks = [
    { name: 'Inicio', href: '/dashboard/' + role },
  ];

  const adminLinks = [
    { name: 'Productos', href: '/dashboard/admin/productos' },
    { name: 'Clientes', href: '/dashboard/admin/clientes' },
    { name: 'Facturas', href: '/dashboard/admin/facturas' },
    { name: 'Cobranzas', href: '/dashboard/admin/cobranzas' },
    { name: 'Órdenes', href: '/dashboard/admin/ordenes' },
    { name: 'Proveedores', href: '/dashboard/admin/proveedores' },
  ];

  const clienteLinks = [
    { name: 'Mis Facturas', href: '/facturas' },
    { name: 'Mis Órdenes', href: '/ordenes' },
  ];

  const linksToShow = role === 'admin' ? [...commonLinks, ...adminLinks] : [...commonLinks, ...clienteLinks];

  if (!role) return null; // Previene renderizado mientras detecta la sesión

  return (
    <aside className="w-64 h-screen bg-darkgreen text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Panel {role}</h2>
        <ul>
          {linksToShow.map((link) => (
            <li key={link.name} className="mb-2">
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="bg-neutral-950 flex items-center justify-center px-4 py-2 rounded hover:bg-red-700 mt-4"
      >
        Cerrar sesión
        <ExitToAppIcon className='ml-3'/>
      </button>
    </aside>
  );
}
