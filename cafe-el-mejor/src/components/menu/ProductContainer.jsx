import Image from "next/image"

export default function ProductContainer(props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-darkgreen rounded-full h-42 w-42 border-darkgreen border-12 hover:border-[#b2d1c3] aspect-square">
        <Image width={425} height={425} alt={props.alt} src={props.src} />
      </div>
      <p className="text-center font-bold text-lg">{props.productName}</p>
    </div>
  )
}