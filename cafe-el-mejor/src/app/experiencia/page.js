import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Page() {
	return (
		<div className="bg-white">
			<Header />
			<header className="bg-darkgreen py-12 text-center text-white text-5xl font-bold">
				Experiencia Café El Mejor
			</header>

			<main className="max-w-5xl mx-auto py-12 px-4">
				<h2 className="text-xl sm:text-3xl text-darkgreen font-bold max-w-2xl mx-auto text-center mb-4">
					Para cada momento hay una forma de vivir la
					Experiencia El Mejor como vos quieras.
				</h2>

				<div className="flex flex-col gap-8 mt-12">
					<div className="bg-stone-200 flex flex-col sm:flex-row items-center shadow">
						<div className="flex-1 text-center sm:text-xl px-6 sm:py-0 py-6 text-center">
							<h3 className="sm:text-3xl font-bold mb-2">In Store</h3>
							<p className="sm:text-lg">
								En nuestras tiendas te esperan nuestros baristas capacitados para ofrecerte una bebida muy especial.
								El ambiente cálido y los detalles de nuestros productos elaborados artesanalmente hacen que la experiencia sea única e inigualable.
							</p>
						</div>
						<div className="flex-1">
							<Image width={1332} height={777} src="/in-store.png" alt="In Store" className="" />
						</div>
					</div>
					<div className="bg-stone-200 flex flex-col sm:flex-row items-center shadow">
						<div className="flex-1">
							<Image width={1332} height={777} src="/drive-thru.png" alt="In Store" className="" />
						</div>
						<div className="flex-1 text-center sm:text-xl px-6 sm:py-0 py-6 text-center">
							<h3 className="sm:text-3xl font-bold mb-2">Drive Thru</h3>
							<p className="sm:text-lg">
								Retirá tu bebida favorita y viví la Experiencia Café El Mejor sin bajarte del auto.
							</p>
						</div>
					</div>
					<div className="bg-stone-200 flex flex-col sm:flex-row items-center shadow">
						<div className="flex-1">
							<Image width={1332} height={777} src="/delivery.png" alt="In Store" className="" />
						</div>
						<div className="flex-1 text-center sm:text-xl px-6 sm:py-0 py-6 text-center">
							<h3 className="sm:text-3xl font-bold mb-2">Delivery</h3>
							<p className="sm:text-lg">
								Los clientes pueden pedir sus bebidas y productos favoritos donde sea que estén con operadores logísticos al servicio como Pedidos Ya.
							</p>
							<div className="mt-4">
								<Link href={'/login'} className="px-4 py-2 bg-white border border-black text-sm rounded hover:bg-gray-200">
									Inicia Sesión
								</Link>
							</div>
						</div>
					</div>

				</div>
			</main>
			<Footer />
		</div>
	);
}
