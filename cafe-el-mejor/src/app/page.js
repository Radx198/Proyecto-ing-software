import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <section className="max-w-6xl bg-[#885542] m-auto text-white text-center flex items-center justify-center">
        <div className="flex justify-center flex-1">
          <Image src="/productos.jpg" alt="Productos" width={1332} height={777} />
        </div>
        <h2 className="text-3xl font-bold flex-1">CONECCIÓN DE CHOCOLATE Y MACADAMIA</h2>
      </section>
      <section className="mt-8 bg-[#d6ede1] text-[#01754a] flex justify-center m-auto max-w-6xl items-center py-16 px-6 text-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold ">Ingresar al portal de administración</h3>
          <p className="mt-2 text-sm">Unite a mejorar la venta de café</p>
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
