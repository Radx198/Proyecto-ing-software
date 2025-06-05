'use client'

import { useState, useEffect, useRef } from "react";
import { getSession, logoutUser } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "@mui/icons-material";

export default function User() {
  const [session, setSession] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    async function fetchSession() {
      const s = await getSession();
      setSession(s);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {
        session ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
            >
              {session.nombre}
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 max-w-max bg-white border flex flex-col items-center justify-center border-gray-200 rounded shadow-md z-50">
                <Link href="/carrito" className="relative">
                  Ver Carrito <ShoppingBag />
                </Link>
                <Link href={`/dashboard/${session.role}`} className="block px-4 py-2 hover:bg-gray-100">
                  Ir al Dashboard
                </Link>
                <div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-1">
            Iniciar sesión
          </Link>
        )
      }
    </div>
  );
}
