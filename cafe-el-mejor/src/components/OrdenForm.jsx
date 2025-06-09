'use client';

import { useEffect, useState } from 'react';

export default function OrdenForm({ initialData = null, onSubmit }) {
  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState(initialData?.proveedor || '');
  const [productos, setProductos] = useState(initialData?.productos || []);
  const [metodoDePago, setMetodoDePago] = useState(initialData?.metodoDePago || '');
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    fetch('/api/proveedores')
      .then(res => res.json())
      .then(data => setProveedores(data));
  }, []);

  useEffect(() => {
    const total = productos.reduce((acc, item) => acc + (item.precioUnitario || 0) * item.cantidad, 0);
    setPrecioTotal(total);
  }, [productos]);

  const handleAgregarProducto = () => {
    setProductos([...productos, { nombre: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...productos];
    nuevos[index][field] = field === 'cantidad' || field === 'precioUnitario' ? parseFloat(value) : value;
    setProductos(nuevos);
  };

  const handleEliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productos.length === 0) {
      alert('Debe agregar al menos un producto.');
      return;
    }

    const productosFormateados = productos.map(p => ({
      nombre: p.nombre,
      cantidad: p.cantidad,
      precioUnitario: p.precioUnitario
    }));

    onSubmit({ proveedor, productos: productosFormateados, metodoDePago, precioTotal });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        className="w-full p-2 border rounded"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
        required
      >
        <option value="">Seleccionar Proveedor</option>
        {proveedores.map(c => (
          <option key={c._id} value={c._id}>
            {c.nombreLegal} - {c.contacto}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        {productos.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <label htmlFor='nombre'>
              Nombre del producto
            </label>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="flex-1 p-2 border rounded"
              value={item.nombre}
              onChange={(e) => handleProductoChange(index, 'nombre', e.target.value)}
              required
            />
            <label htmlFor='cantidad'>
              Cantidad
            </label>
            <input
              type="number"
              min={1}
              placeholder="Cantidad"
              className="w-20 p-2 border rounded"
              value={item.cantidad}
              onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
              required
            />
            <label htmlFor='precioUnitario'>
              Precio unitario
            </label>
            $
            <input
              type="number"
              min={0}
              step={0.01}
              placeholder="Precio unitario"
              className="w-24 p-2 border rounded"
              value={item.precioUnitario}
              onChange={(e) => handleProductoChange(index, 'precioUnitario', e.target.value)}
              required
            />
            <button type="button" onClick={() => handleEliminarProducto(index)} className="text-red-500 font-bold">
              ×
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarProducto} className="text-blue-600 underline text-sm">
          + Agregar producto
        </button>
      </div>

      <select
        className="w-full p-2 border rounded"
        value={metodoDePago}
        onChange={(e) => setMetodoDePago(e.target.value)}
        required
      >
        <option value="">Seleccionar método de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="tarjeta">Tarjeta</option>
        <option value="transferencia">Transferencia</option>
        <option value="mercadoPago">MercadoPago</option>
      </select>

      <div className="w-full p-2 border rounded bg-gray-50">
        <strong>Total:</strong> ${precioTotal.toFixed(2)}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar Orden de Compra
      </button>
    </form>
  );
}
