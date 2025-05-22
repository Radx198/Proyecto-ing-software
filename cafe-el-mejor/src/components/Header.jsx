import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 shadow-lg">
      <div className="flex max-w-6xl m-auto justify-between items-center  ">
        <div className="flex max-w-6xl items-center gap-4">
          <Image src="/logo.png" className="w-16 h-16" alt="Starbucks Logo" width={1024} height={1024} />
          <nav className="flex gap-4 font-semibold">
            <Link href="#">MENU</Link>
            <Link href="#">CAFÉ</Link>
            <Link href="#">EXPERIENCIA CAFÉ EL MEJOR</Link>
          </nav>
        </div>
        <div className="">
          <Link href="#" className="flex items-center gap-1">
            <LocationOnIcon /> Localizar Tienda
          </Link>
        </div>
      </div>
    </header>
  )
}