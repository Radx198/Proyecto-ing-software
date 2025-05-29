import Link from "next/link";

export default function ProductContainer({ href, src, alt, productName, price, description }) {
  return (
    <div>
      <Link href={`/tienda/${href}`} className="bg-gradient-to-b from-white/50 to-transparent overflow-hidden relative p-2 flex flex-col items-center justify-between rounded-lg shadow-lightgreen shadow-md max-w-46 hover:shadow-lg transition-shadow cursor-pointer">
        <h4 className="font-bold self-start text-neutral-800">{productName}</h4>
        <p className="self-start font-semibold text-xs text-neutral-700 mt-1">{description}</p>
        <div className="rounded-xl bg-neutral-100 absolute top-1 right-1">
          <p className="px-1 font-semibold text-darkgreen">${price}</p>
        </div>
        <div className="align-self-end">
          <img
            src={src}
            alt={alt}
            className="w-40 h-40 object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
        <img
          src={'/empty-industrial-room-interior-design.jpg'}
          alt={alt}
          className="absolute object-fill bottom-0 left-0 right-0 z-[-1]"
          loading="lazy"
          draggable={false}
        />
      </Link>
    </div>
  );
}
