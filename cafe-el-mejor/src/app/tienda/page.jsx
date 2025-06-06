'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductContainer from "@/components/tienda/ProductContainer";
import { useProductos } from "@/hooks/useProductos";

export default function Page() {
  const { productos, loading } = useProductos();
  return (
    <div className="font-sans text-gray-800 ">
      <Header />
      <section className="p-4 m-auto w-full max-w-6xl border-b mt-3 space-y-2 py-4 mb-6 border-neutral-400">
        <h2 className="text-xl font-semibold">
          La experiencia Café El Mejor donde estés:
        </h2>
        <h1 className="font-bold text-3xl max-w-xl">
          Comprar Online
        </h1>
      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-start min-h-screen">
        {productos.map((producto) =>
          <div key={producto._id}>
            <ProductContainer
              href={producto._id}
              alt={producto.nombre}
              src={producto.imagen}
              productName={producto.nombre}
              price={producto.precio}
              description={producto.descripcion}
            />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
