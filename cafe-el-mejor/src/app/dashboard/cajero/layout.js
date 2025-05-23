import AuthGuard from "@/components/AuthGuard";

export default function Layout({children}){
  return(
    <AuthGuard allowedRoles={['admin', 'cajero']}>
      {children}
    </AuthGuard>
  )
}