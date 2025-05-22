'use client';

import { useEffect, useState } from 'react';

export default function OrdenForm({ initialData = null, onSubmit }) {
  const [clientes, setClientes] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [cliente, setCliente] = useState(initialData?.cliente || '');
  const [productos, setProductos] = useState(initialData?.productos || []);
  const [metodoDePago, setMetodoDePago] = useState(initialData?.metodoDePago || '');
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch('/api/productos')
      .then(res => res.json())
      .then(data => setProductosDisponibles(data));
  }, []);

  useEffect(() => {
    const total = productos.reduce((acc, item) => {
      const prod = productosDisponibles.find(p => p._id === item.producto);
      return acc + (prod ? prod.precio * item.cantidad : 0);
    }, 0);
    setPrecioTotal(total);
  }, [productos, productosDisponibles]);

  const handleAgregarProducto = () => {
    setProductos([...productos, { producto: '', cantidad: 1 }]);
  };

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...productos];
    nuevos[index][field] = field === 'cantidad' ? parseInt(value) : value;
    setProductos(nuevos);
  };

  const handleEliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cliente, productos, metodoDePago, precioTotal });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        className="w-full p-2 border rounded"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      >
        <option value="">Seleccionar Cliente</option>
        {clientes.map(c => (
          <option key={c._id} value={c._id}>
            {c.nombre} {c.apellido} - {c.email}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        {productos.map((item, index) => (
          <div key={index} className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded"
              value={item.producto}
              onChange={(e) => handleProductoChange(index, 'producto', e.target.value)}
              required
            >
              <option value="">Producto</option>
              {productosDisponibles.map(p => (
                <option key={p._id} value={p._id}>
                  {p.nombre} (${p.precio})
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              className="w-20 p-2 border rounded"
              value={item.cantidad}
              onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
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

      <input
        type="text"
        placeholder="Método de pago"
        className="w-full p-2 border rounded"
        value={metodoDePago}
        onChange={(e) => setMetodoDePago(e.target.value)}
        required
      />

      <div className="w-full p-2 border rounded bg-gray-50">
        <strong>Total:</strong> ${precioTotal.toFixed(2)}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar Orden
      </button>
    </form>
  );
}
