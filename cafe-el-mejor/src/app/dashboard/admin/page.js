'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [metrics, setMetrics] = useState({
    productos: 0,
    clientes: 0,
    facturas: 0,
    ordenes: 0,
  });

  const [ultimosProductos, setUltimosProductos] = useState([]);
  const [ultimosClientes, setUltimosClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [productosRes, clientesRes, facturasRes, ordenesRes] = await Promise.all([
        fetch('/api/productos').then(r => r.json()),
        fetch('/api/clientes').then(r => r.json()),
        fetch('/api/facturas').then(r => r.json()),
        fetch('/api/ordenes').then(r => r.json()),
      ]);

      setMetrics({
        productos: productosRes.length,
        clientes: clientesRes.length,
        facturas: facturasRes.length,
        ordenes: ordenesRes.length,
      });

      setUltimosProductos(productosRes.slice(-5).reverse());
      setUltimosClientes(clientesRes.slice(-5).reverse());
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:place-items-start sm:justify-start sm:items-start items-center justify-center p-2 sm:p-6 sm:mx-0 mx-auto">
      <h1 className="text-3xl font-bold">Bienvenido Administrador</h1>
      <p>Desde aquí podés gestionar productos, clientes, proveedores y más.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="backdrop-blur-sm shadow rounded p-4">
            <p className="text-gray-600 capitalize">{key}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold mb-2">Últimos productos agregados</h2>
        <table className="backdrop-blur-sm rounded shadow w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Precio</th>
              <th className="text-left p-2">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {ultimosProductos.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">${p.precio}</td>
                <td className="p-2">{p.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold mb-2 w-full">Últimos clientes registrados</h2>
        <table className="w-full backdrop-blur-sm rounded shadow text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Apellido</th>
              <th className="text-left p-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {ultimosClientes.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.apellido}</td>
                <td className="p-2">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
