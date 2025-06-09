'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditarOrdenPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  const [form, setForm] = useState({
    cliente: '',
    productos: [],
    precioTotal: '',
    metodoDePago: '',
  });

  useEffect(() => {
    async function fetchOrden() {
      try {
        const res = await fetch(`/api/ordenes/${id}`);
        if (!res.ok) throw new Error('Error al obtener la orden');
        const data = await res.json();
        setForm({
          cliente: data.cliente || '',
          productos: data.productos || [],
          precioTotal: data.precioTotal || '',
          metodoDePago: data.metodoDePago || '',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrden();
  }, [id]);

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch('/api/productos')
      .then(res => res.json())
      .then(data => setProductosDisponibles(data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...form.productos];
    nuevosProductos[index][field] = value;
    setForm(prev => ({ ...prev, productos: nuevosProductos }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/ordenes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        precioTotal: parseFloat(form.precioTotal),
      }),
    });
    router.push('../');
  };

  if (loading) return <p className="p-4">Cargando orden...</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Orden</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Cliente:
          <select
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(cliente => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Precio Total:
          <input
            name="precioTotal"
            type="number"
            step="0.01"
            value={form.precioTotal}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block">
          Método de Pago:
          <select
            name="metodoDePago"
            value={form.metodoDePago}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Seleccione un método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="mercadoPago">MercadoPago</option>
          </select>
        </label>

        <div>
          <h2 className="font-semibold mb-2">Productos</h2>
          {form.productos.map((item, index) => (
            <div key={index} className="mb-2 border p-2 rounded space-y-2">
              <select
                value={item.producto}
                onChange={e => handleProductoChange(index, 'producto', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccione un producto</option>
                {productosDisponibles.map(prod => (
                  <option key={prod._id} value={prod._id}>
                    {prod.nombre}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Cantidad"
                value={item.cantidad}
                onChange={e => handleProductoChange(index, 'cantidad', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Actualizar
        </button>
      </form>
    </main>
  );
}
