import Link from "next/link"

export default function page(){
  return(
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Link href="./" className="text-2xl">
        404 Ups, página no encontrada... Click aqui para volver atrás.
      </Link>
    </div>
  )
}