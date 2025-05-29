'use client';

import { useEffect, useState } from 'react';

export default function FacturaPage({ facturaId }) {
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    async function fetchFactura() {
      const res = await fetch(`/api/facturas/${facturaId}`);
      const data = await res.json();
      setFactura(data);
    }
    fetchFactura();
  }, [facturaId]);

  if (!factura) return <p className="text-center p-8">Cargando factura...</p>;

  const { identificacion, metodoDePago, fecha, monto, cliente } = factura;

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans text-gray-800 border border-gray-300 shadow-md">
      <h1 className="text-center text-2xl font-semibold mb-8">FACTURA</h1>

      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p><strong>FECHA:</strong> {new Date(fecha).toLocaleDateString()}</p>
          <p><strong>N.º DE FACTURA:</strong> {identificacion}</p>
        </div>
        <div>
          <p><strong>PARA:</strong></p>
          <p>{cliente.nombre} {cliente.apellido}</p>
          <p>{cliente.direccion}</p>
          <p>{cliente.telefono}</p>
          <p>DNI: {cliente.dni}</p>
        </div>
      </div>

      <table className="w-full border border-gray-400 text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Vendedor</th>
            <th className="border p-2">Condiciones de Pago</th>
            <th className="border p-2">Método</th>
            <th className="border p-2">Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Óscar Martínez</td>
            <td className="border p-2">Pago a la recepción</td>
            <td className="border p-2 capitalize">{metodoDePago}</td>
            <td className="border p-2">{new Date(fecha).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border border-gray-400 text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">CANT.</th>
            <th className="border p-2">DESCRIPCIÓN</th>
            <th className="border p-2">PRECIO UNITARIO</th>
            <th className="border p-2">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {/* Factura sin ítems: ejemplo de línea fija */}
          <tr>
            <td className="border p-2 text-center">1</td>
            <td className="border p-2">Servicio/Producto</td>
            <td className="border p-2 text-right">${monto.toFixed(2)}</td>
            <td className="border p-2 text-right">${monto.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right text-sm space-y-1">
        <p><strong>SUBTOTAL:</strong> ${monto.toFixed(2)}</p>
        <p><strong>IMPUESTO:</strong> $0.00</p>
        <p><strong>TOTAL:</strong> ${monto.toFixed(2)}</p>
      </div>

      <footer className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
        TODOS LOS CHEQUES SE EXTENDERÁN A NOMBRE DE CREATE & CO.<br />
        ¡Gracias por su confianza!
      </footer>
    </main>
  );
}
