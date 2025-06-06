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
    <main className="max-w-4xl mx-auto p-6 font-sans text-gray-800 border border-gray-300 shadow-md bg-white mt-6">
      {factura ? 
      <>
        <h1 className="text-center text-2xl font-semibold mb-8">FACTURA</h1>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p><strong>FECHA:</strong> {new Date(fecha).toLocaleDateString()}</p>
            <p><strong>N.º DE FACTURA:</strong> {identificacion}</p>
          </div>
          <div>
            <p><strong>PARA:</strong></p>
            <p>{factura.cliente?.nombre} {factura.cliente?.apellido}</p>
            <p>{factura.cliente?.direccion}</p>
            <p>{factura.cliente?.telefono}</p>
          </div>
        </div>

        <table className="w-full border border-gray-400 text-sm mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Método</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{new Date(fecha).toLocaleDateString()}</td>
              <td className="border p-2 capitalize">{metodoDePago}</td>
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
          <p><strong>IMPUESTO:</strong> ${(monto * 0.21).toFixed(2)} IVA 21%</p>
          <p><strong>TOTAL:</strong> ${(monto + monto * 0.21).toFixed(2)}</p>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
          TODOS LOS CHEQUES SE EXTENDERÁN A NOMBRE DE CAFÉ EL MEJOR.<br />
          ¡Gracias por su confianza!
        </footer>
      </>
      :
        <></>
      }
    </main>
  );
}
