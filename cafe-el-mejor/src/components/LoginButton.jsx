'use client'

import { getSession } from "@/utils/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginButton() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    async function fetchSession() {
      const s = await getSession();
      if (!s) {
        return null
      }
      setSession(s)
    }
    fetchSession();
  }, [])
  return (
    <>
      {
        session ?
          <div>
            <Link className="hover:bg-[#1e3932] rounded-full  hover:text-white transition px-4 py-2 border border-[#1e3932]" href={`/dashboard/${session.role}`} >
              Ingresar al sistema
            </Link >
          </div>
          :
          <div>
            <Link className="hover:bg-[#1e3932] rounded-full  hover:text-white transition px-4 py-2 border border-[#1e3932]" href="/login" >
              Iniciar sesión
            </Link >
          </div>
      }
    </>
  )
}