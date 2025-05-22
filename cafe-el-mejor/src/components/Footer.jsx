export default function Footer() {
  return (
    <footer className="bg-gray-100 px-6 py-10 text-sm text-gray-700 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div>
        <h4 className="font-semibold mb-2">Sobre nosotros</h4>
        <ul>
          <li>Nuestra historia</li>
          <li>Nuestra misión</li>
          <li>Nuestra cultura inclusiva y valores</li>
          <li>Nuestro café</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Impacto social</h4>
        <ul>
          <li>Planeta</li>
          <li>Personas</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Atención al cliente</h4>
        <ul>
          <li>Contacto</li>
          <li>Medios de pago</li>
          <li>Defensa de las y los consumidores</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Experiencia Café El Mejor</h4>
        <ul>
          <li>Formas de comprar</li>
          <li>Delivery</li>
        </ul>
      </div>
    </footer>
  )
}