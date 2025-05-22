import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Bienvenido al dashboard de Café El Mejor",
};

export default function RootLayout({ children }) {
  return (
    <main className="flex">
      <Sidebar />
      {children}
    </main>
  );
}
