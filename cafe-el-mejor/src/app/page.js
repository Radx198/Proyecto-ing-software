import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <section className="max-w-6xl bg-[#885542] relative m-auto text-white text-center flex items-center justify-center">
        <div className="flex justify-start flex-1 left-0 max-h-96">
          <Image src="/banner.png" alt="Banner" className="object-cover" width={1280} height={853} />
        </div>
        <div className="max-w-sm sm:max-w-auto hidden text-start absolute sm:flex flex-col items-start justify-start gap-y-2 p-4 sm:bg-neutral-100/10 rounded sm:backdrop-blur-sm">
          <p className="text-neutral-900 text-xl sm:text-3xl font-bold tracking-tight leading-none">CAFÉ EL MEJOR</p>
          <p className="text-neutral-800 font-semibold">Ahora nuestro café llega a donde estés, viví la experiencia.</p>
          <div className="mt-3">
            <Link href={'/tienda'} className="text-neutral-900 bg-white p-2 transition-all font-semibold">Ir a la tienda</Link>
          </div>
        </div>
        <div className="top-0 left-0 sm:hidden max-w-sm sm:max-w-auto text-start absolute flex flex-col items-start justify-start gap-y-2 p-4 sm:bg-neutral-100/10 rounded sm:backdrop-blur-sm">
          <p className="text-neutral-900 text-xl sm:text-3xl font-bold tracking-tight leading-none">CAFÉ EL MEJOR</p>
          <p className="text-neutral-800 font-semibold">Ahora nuestro café llega a donde estés, viví la experiencia.</p>
          <div className="mt-3">
            <Link href={'/tienda'} className="text-neutral-900 bg-white p-2 transition-all font-semibold">Ir a la tienda</Link>
          </div>
        </div>
      </section>
      <section className="mt-8 bg-[#d6ede1] text-[#01754a] flex justify-center m-auto max-w-6xl items-center py-16 px-6 text-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold ">Ingresar al portal de administración</h3>
          <p className="mt-2 text-sm">Unite a mejorar la experiencia del café</p>
          <div className="max-w-32 m-auto mt-4 text-sm ">
            <Link className="hover:bg-[#1e3932] rounded-full  hover:text-white transition px-4 py-2 border border-[#1e3932] " href="/login">
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image src="/barista.png" alt="Recruitment" width={600} height={704} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
