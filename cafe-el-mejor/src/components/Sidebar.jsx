'use client';

import { usePathname } from 'next/navigation';

import {
  ExitToApp,
  Inventory,
  People,
  PersonOutline,
  Receipt,
  ShoppingCart,
  LocalAtm,
  Store,
  Home,
  Menu,
  Close,
} from '@mui/icons-material';

import Link from 'next/link';
import { getSession, logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const commonLinks = [
    { name: 'Inicio', href: '/dashboard/' + session?.role, icon: <Home fontSize="small" /> },
  ];

  const adminLinks = [
    { name: 'Productos', href: '/dashboard/admin/productos', icon: <Inventory fontSize="small" /> },
    { name: 'Clientes', href: '/dashboard/admin/clientes', icon: <People fontSize="small" /> },
    { name: 'Facturas', href: '/dashboard/admin/facturas', icon: <Receipt fontSize="small" /> },
    { name: 'Cobranzas', href: '/dashboard/admin/cobranzas', icon: <LocalAtm fontSize="small" /> },
    { name: 'Órdenes', href: '/dashboard/admin/ordenes', icon: <ShoppingCart fontSize="small" /> },
    { name: 'Proveedores', href: '/dashboard/admin/proveedores', icon: <Store fontSize="small" /> },
    { name: 'Usuarios', href: '/dashboard/admin/usuarios', icon: <PersonOutline fontSize="small" /> },
  ];

  const clienteLinks = [
    { name: 'Mis Facturas', href: '/dashboard/cliente/facturas', icon: <Receipt fontSize="small" /> },
    { name: 'Mis Órdenes', href: '/dashboard/cliente/ordenes', icon: <ShoppingCart fontSize="small" /> },
  ];

  const cajeroLinks = [
    { name: 'Ver Facturas', href: '/dashboard/cajero/facturas', icon: <Receipt fontSize="small" /> },
    { name: 'Cobranza', href: '/dashboard/cajero/cobranzas', icon: <LocalAtm fontSize="small" /> },
  ];

  const personalDeCompraLinks = [
    { name: 'Proveedores', href: '/facturas', icon: <Store fontSize="small" /> },
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
    <>
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-green-700 w-8 flex items-center justify-center aspect-square rounded-full text-white shadow-md"
        >
          {isOpen ? <Close /> : <Menu />}
        </button>
      </div>

      <aside
        className={`fixed sm:static top-0 left-0 bg-[#1d3b34] text-white z-40 w-64 transform transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}  pt-10 sm:translate-x-0 sm:flex h-full sm:h-auto flex-col justify-between`}
      >
        <div className="p-5">
          <div className="mb-6">
            <p className="text-sm text-gray-300">Bienvenido,</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold uppercase">
                {session.nombre?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-lg">{session.nombre}</p>
                <p className="text-sm capitalize text-green-200">{session.role}</p>
              </div>
            </div>
          </div>
          <ul className="space-y-2">
            {linksToShow.map((link) => {
              const isHome = link.name === 'Inicio';
              const isActive = isHome
                ? pathname === link.href 
                : pathname.startsWith(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`${isActive ? 'bg-green-800 font-semibold' : 'hover:bg-green-800'} flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-800 transition-colors duration-200`}
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              );
            }
            )}
          </ul>
        </div>
        <div className="p-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Cerrar sesión
            <ExitToApp fontSize="small" />
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
