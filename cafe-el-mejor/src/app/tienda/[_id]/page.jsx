'use client';

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductContainer from "@/components/tienda/ProductContainer";
import { useProductos } from "@/hooks/useProductos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { getSession } from "@/utils/auth";

export default function Page() {
  const [producto, setProducto] = useState(null);
  const { productos, loading } = useProductos();
  const params = useParams();
  const [cantidad, setCantidad] = useState(0);
  const session = getSession();

  useEffect(() => {
    if (!loading && productos.length > 0 && params._id) {
      const encontrado = productos.find(p => p._id === params._id);
      if (encontrado) setProducto(encontrado);
    }
  }, [productos, loading, params._id]);


  function handleDecrement(e) {
    e.preventDefault();
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  function handleIncrement(e) {
    e.preventDefault();
    if (producto.stock > cantidad && 10 > cantidad) {
      setCantidad(cantidad + 1)
    }
  }

  return (
    <main className="font-sans text-gray-800 min-h-screen">
      <Header />

      <section className="">
        {loading ? (
          <p>Cargando producto...</p>
        ) : producto ? (
          <div className="grid sm:grid-cols-2 grid-cols-1 rounded gap-y-4">
            <div className="flex items-center justify-center flex-1 bg-neutral-200">
              <Image width={425} height={425} alt={producto.nombre} src={producto.imagen} />
            </div>
            <div className="sm:mt-8 sm:max-w-md sm:mx-auto w-full p-2 flex flex-col items-center justify-center sm:justify-between sm:items-start flex-1">
              <div className="self-start mb-2 w-full">
                <div className="flex justify-between w-full">
                  <h1 className="font-semibold text-lg tracking-tight">
                    {producto.nombre}
                  </h1>
                  <p className="font-semibold text-lg tracking-tight">
                    ${producto.precio.toLocaleString(2)}
                  </p>
                </div>
                <h2>
                  {producto.descripcion}
                </h2>
              </div>
              <div className="flex flex-col w-full place-items-center">
                <div className="flex justify-between items-center w-full">
                  <p>
                    Cantidad:
                  </p>
                  <div className="w-36 h-8 justify-between border border-neutral-600 rounded-xl flex items-center gap-x-2 font-semibold relative">
                    {cantidad === 10 ?
                      <div className="absolute top-[-100%] right-0 mx-auto text-darkgreen left-0 w-max">
                        <p className="text-xs text-darkgreen">
                          Máximo 10 unidades
                        </p>
                      </div> :
                      <>
                      </>
                    }
                    <button onClick={handleDecrement} className="text-neutral-600 px-2 w-8 h-full flex items-center justify-start rounded-md">
                      <Remove />
                    </button>
                    <p className="border-neutral-600 flex items-center justify-center rounded-md">
                      {cantidad}
                    </p>
                    <button onClick={handleIncrement} className="text-neutral-600 px-2 w-8 h-full flex items-center justify-center rounded-md">
                      <Add />
                    </button>
                  </div>
                </div>
                {session !== null ?
                  <div className="self-end py-2">
                    {producto.stock > 0 ?
                      <button className="w-36 border-neutral-800 p-2 bg-darkgreen text-white rounded-md">
                        Inicia sesión para comprar
                      </button>
                      :
                      <button disabled className="cursor-not-allowed w-36 border-neutral-800 p-2 bg-darkgreen text-white rounded-md">
                        No hay stock
                      </button>
                    }
                  </div>
                  :
                  <div className="self-end py-2">
                    {producto.stock > 0 ?
                      <button className="w-36 border-neutral-800 p-2 bg-darkgreen text-white rounded-md">
                        Agregar al carrito
                      </button>
                      :
                      <button disabled className="cursor-not-allowed w-36 border-neutral-800 p-2 bg-darkgreen text-white rounded-md">
                        No hay stock
                      </button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        ) : (
          <p>Producto no encontrado.</p>
        )}
      </section>

      <Footer />
    </main >
  );
}
