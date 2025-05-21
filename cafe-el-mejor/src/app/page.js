import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
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
              <span>📍</span> Localizar Tienda
            </Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="max-w-6xl bg-[#885542] m-auto text-white text-center flex items-center justify-center">
        <div className="flex justify-center flex-1">
          <Image src="/productos.jpg" alt="Productos" width={1332} height={777} />
        </div>
        <h2 className="text-3xl font-bold flex-1">CONECCIÓN DE CHOCOLATE Y MACADAMIA</h2>
      </section>

      {/* Reclutamiento */}
      <section className="mt-8 bg-[#d6ede1] text-[#01754a] flex justify-center m-auto max-w-6xl items-center py-16 px-6 text-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold ">Ingresar al portal de administración</h3>
          <p className="mt-2 text-sm">Unite a mejorar la venta de café</p>
          <div className="max-w-32 m-auto mt-4 px-4 py-2 border border-[#1e3932] rounded-full text-sm hover:bg-[#1e3932] hover:text-white transition">
            <Link href="/login">
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image src="/barista.png" alt="Recruitment" width={600} height={704} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 px-6 py-10 text-sm text-gray-700 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Sobre nosotros</h4>
          <ul>
            <li>Nuestra historia</li>
            <li>Nuestra misión</li>
            <li>Nuestra cultura inclusiva y valores</li>
            <li>Nuestro café</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Impacto social</h4>
          <ul>
            <li>Planeta</li>
            <li>Personas</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Atención al cliente</h4>
          <ul>
            <li>Contacto</li>
            <li>Medios de pago</li>
            <li>Defensa de las y los consumidores</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Experiencia Café El Mejor</h4>
          <ul>
            <li>Formas de comprar</li>
            <li>Delivery</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
