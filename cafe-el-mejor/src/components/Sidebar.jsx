'use client';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';

import Link from 'next/link';
import { getSession, logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Sidebar() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const s = await getSession();
      if (!s) router.push('/login');
      else setSession(s);
    }
    fetchSession();
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const commonLinks = [
    { name: 'Inicio', href: '/dashboard/' + session?.role, icon: <HomeIcon /> },
  ];

  const adminLinks = [
    { name: 'Productos', href: '/dashboard/admin/productos', icon: <InventoryIcon /> },
    { name: 'Clientes', href: '/dashboard/admin/clientes', icon: <PeopleIcon /> },
    { name: 'Facturas', href: '/dashboard/admin/facturas', icon: <ReceiptIcon /> },
    { name: 'Cobranzas', href: '/dashboard/admin/cobranzas', icon: <LocalAtmIcon /> },
    { name: 'Órdenes', href: '/dashboard/admin/ordenes', icon: <ShoppingCartIcon /> },
    { name: 'Proveedores', href: '/dashboard/admin/proveedores', icon: <StoreIcon /> },
    { name: 'Usuarios', href: '/dashboard/admin/usuarios', icon: <PersonOutlineIcon /> },
  ];

  const clienteLinks = [
    { name: 'Mis Facturas', href: '/dashboard/cliente/facturas', icon: <ReceiptIcon /> },
    { name: 'Mis Órdenes', href: '/dashboard/cliente/ordenes', icon: <ShoppingCartIcon /> },
  ];

  const cajeroLinks = [
    { name: 'Ver Facturas', href: '/dashboard/cajero/facturas', icon: <ReceiptIcon /> },
    { name: 'Cobranza', href: '/dashboard/cajero/cobranzas', icon: <LocalAtmIcon /> },
  ];

  const personalDeCompraLinks = [
    { name: 'Proveedores', href: '/facturas', icon: <StoreIcon /> },
  ];

  if (!session) return null;

  const linksByRole = {
    admin: adminLinks,
    cliente: clienteLinks,
    cajero: cajeroLinks,
    personalDeCompra: personalDeCompraLinks,
  };

  const linksToShow = [...commonLinks, ...(linksByRole[session.role] || [])];

  return (
    <aside className="w-64 h-screen bg-darkgreen text-white p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <p className="text-sm text-gray-300">Bienvenido,</p>
          <p className="font-semibold text-lg">{session.nombre}</p>
          <p className="text-sm capitalize text-green-200">{session.role}</p>
        </div>
        <ul>
          {linksToShow.map((link) => (
            <li key={link.name} className="mb-2">
              <Link href={link.href} className="flex items-center gap-2 hover:underline">
                {link.icon}
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
        <ExitToAppIcon className="ml-3" />
      </button>
    </aside>
  );
}
