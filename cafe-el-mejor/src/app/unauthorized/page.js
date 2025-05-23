import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <Sidebar />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Acceso denegado</h1>
        <p className="mt-2 text-gray-700">No tenés permiso para ver esta página.</p>
        <Link href={'/dashboard/cliente'} className="mt-2">Volver al inicio</Link>
      </div>
    </div>
  );
}
