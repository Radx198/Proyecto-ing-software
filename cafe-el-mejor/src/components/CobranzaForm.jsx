'use client';
import { useState } from 'react';

export default function CobranzaForm({ initialData = null, onSubmit }) {
  const [identificacion, setIdentificacion] = useState(initialData?.identificacion || '');
  const [metodoPago, setMetodoPago] = useState(initialData?.metodoPago || '');
  const [producto, setProducto] = useState(initialData?.producto || '');
  const [cliente, setCliente] = useState(initialData?.cliente || '');
  const [fecha, setFecha] = useState(initialData?.fecha || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ identificacion, metodoPago, producto, cliente, fecha });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Identificación" className="input" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required />
      <input type="text" placeholder="Método de pago" className="input" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required />
      <input type="text" placeholder="Producto" className="input" value={producto} onChange={(e) => setProducto(e.target.value)} required />
      <input type="text" placeholder="Cliente" className="input" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
      <input type="date" className="input" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <button type="submit" className="btn-primary">Guardar Cobranza</button>
    </form>
  );
}
