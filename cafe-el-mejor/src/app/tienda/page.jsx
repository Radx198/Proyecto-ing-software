'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductContainer from "@/components/tienda/ProductContainer";
import { useProductos } from "@/hooks/useProductos";

export default function Page() {
  const { productos, loading } = useProductos();
  return (
    <div className="font-sans text-gray-800 min-h-screen">
      <Header />

      <section className="p-4 m-auto w-full max-w-6xl border-b py-4 mb-6 border-neutral-400">
        <h3 className="font-semibold text-xl">Comprar Online</h3>

      </section>
      <section className="p-4 max-w-6xl m-auto grid xl:grid-cols-3 grid-cols-2 gap-8 place-items-center">
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
