import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Bienvenido al dashboard de Café El Mejor",
};

export default function Layout({ children }) {
  return (
    <main className="flex min-h-screen text-xs sm:text-sm">
      <Sidebar />
      {children}
    </main>
  );
}
