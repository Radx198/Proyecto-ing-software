import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <section className="text-white flex items-center bg-darkgreen">
        <div className="max-w-2xl flex items-center m-auto w-full xl:py-24 py-12">
          <h1 className="p-4 sm:p-0 text-4xl xl:text-5xl font-black">
            Nuestro café
          </h1>
        </div>
      </section>
      <section>
        <p className="p-4 sm:p-0 max-w-2xl m-auto font-normal text-xl my-8">
          El olor al café, a unos granos recién tostados, es la mejor bienvenida que cada día planificamos para brindarles cuando abrimos las puertas de nuestras tiendas. Pero eso es sólo el comienzo.</p>
        <div className="max-w-2xl flex items-center m-auto w-full">
          <Image width={658} height={437} alt={"Café"} src="/cafe/2022-03_Nuestro Café.png" />
        </div>
        <p className="p-4 sm:p-0 max-w-2xl m-auto font-normal text-xl my-8">
          De cuerpo entero, un poco ahumado, con notas cítricas, con fuerte presencia de chocolate…el desafío que tenemos constantemente es que cada uno de nuestros clientes encuentre su mezcla favorita y a la vez, que explore nuestras amplias selecciones más singulares.
        </p>
        <p className="p-4 sm:p-0 max-w-2xl m-auto font-normal text-xl my-8">
          Para alcanzarlo nos abastecemos de los mejores granos de café arábicos siguiendo siempre estrictos principios éticos.
        </p>
      </section>
      <Footer />
    </div>
  );
}