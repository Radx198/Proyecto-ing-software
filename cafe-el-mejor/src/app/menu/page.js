import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductContainer from "@/components/menu/ProductContainer";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <section className="max-w-6xl m-auto text-xl py-6">
        <h2 className="font-semibold">
          ¡Disfrutalos!
        </h2>
        <h1 className="font-bold text-3xl max-w-xl">
          Conoce nuestras bebidas y alimentos de temporada
        </h1>
      </section>
      <section className="m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Bebidas</h3>
      </section>
      <section className="max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="Flat white" src="/products/2022-03_Flat White 425x425 sin fondo.png" productName="Flat White" />
        <ProductContainer alt="Flat white" src="/products/2022-03_Flat White 425x425 sin fondo.png" productName="Flat White" />
        <ProductContainer alt="Flat white" src="/products/2022-03_Flat White 425x425 sin fondo.png" productName="Flat White" />
        <ProductContainer alt="Flat white" src="/products/2022-03_Flat White 425x425 sin fondo.png" productName="Flat White" />
      </section>
      <Footer />
    </div>
  );
}
