import Image from "next/image";
import Link from "next/link";
import User from "./User";

export default function Header() {
  return (
      <header className="text-xs sm:text-sm w-full px-2 sm:px-6 py-4 shadow-lg">
        <div className="flex max-w-6xl m-auto justify-between items-center  ">
          <div className="flex max-w-6xl items-center gap-2 sm:gap-4">
            <Link href={"/"}>
              <Image src="/logo.png" className="sm:w-18 sm:h-18 w-12 h-12 aspect-square" alt="Logo" width={1024} height={1024} />
            </Link>
            <nav className="flex gap-4 font-semibold">
              <Link href="/menu">MENÚ</Link>
              <Link href="/tienda">TIENDA</Link>
              <Link href="/cafe">CAFÉ</Link>
              <Link href="/experiencia">EXPERIENCIA</Link>
            </nav>
          </div>
          <div className="">
            <User />
          </div>
        </div>
      </header>
  )
}