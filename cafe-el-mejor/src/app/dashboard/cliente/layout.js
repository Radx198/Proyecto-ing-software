import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Dashboard",
  description: "Bienvenido al dashboard de Café El Mejor",
};

export default function Layout({ children }) {
  return (
    <AuthGuard allowedRoles={["cliente"]}>
      {children}
    </AuthGuard>
  );
}
