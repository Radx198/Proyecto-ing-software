import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductContainer from "@/components/menu/ProductContainer";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <section className=" p-4 max-w-6xl m-auto text-xl py-6">
        <h2 className="font-semibold">
          ¡Disfrutalos!
        </h2>
        <h1 className="font-bold text-3xl max-w-xl">
          Conoce nuestras bebidas y alimentos de temporada
        </h1>
      </section>
      <section className="p-4 m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Bebidas Calientes</h3>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="Flat white" src="/products/2022-03_Flat White 425x425 sin fondo.png" productName="Flat White" />
        <ProductContainer alt="Chocolate" src="/products/2022-03_Chocolate Caliente 425x425 sin fondo (1).png" productName="Chocolate Caliente" />
        <ProductContainer alt="Frap" src="/products/2022-03_Dulce de leche Frapp 425x425 sin fondo.png" productName="Dulce de Leche Frap" />
      </section>
      <section className="p-4 m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Bebidas Frías</h3>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="Mango" src="/products/2022-03_Mango Dragonfruit sin fondo.png" productName="Mango Dragonfruit" />
        <ProductContainer alt="Verde" src="/products/2022-03_Te Verde Frutilla 425x425 sin fondo.png" productName="Té Verde Frutilla" />
        <ProductContainer alt="Caramel" src="/products/2022-03_Iced Caramel Macchiato 425x425 sin fondo_0.png" productName="Iced Caramel Machiato" />
      </section>
      <section className="p-4 m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Panaderia</h3>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="Croissant" src="/products/2022-03_Croissant-Relleno-Avellana-425-x-425.png" productName="Croissant Relleno con Avellanas" />
        <ProductContainer alt="Bagel" src="/products/2022-03_Bagel-Sandwich-425-x-425.png" productName="Bagel Sandwich" />
      </section>
      <section className="p-4 m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Té</h3>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="English" src="/products/2022-03_English Breakfast 425x425 sin fondo.png" productName="English Breakfast" />
      </section>
      <section className="p-4 m-auto w-full max-w-6xl border-b border-t py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Envasados</h3>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
        <ProductContainer alt="Verona" src="/products/2024-04_VERONA_MEDIA_LIBRA.png" productName="Verona Media Libra" />
        <ProductContainer alt="Hibiscus" src="/products/2022-02_CAJA-TE-HIBISCUS_2.png" productName="Té de Hibiscus" />
      </section>
      <Footer />
    </div>
  );
}
