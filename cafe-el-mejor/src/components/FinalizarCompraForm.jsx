'use client';
import { useState } from 'react';
import { useCarrito } from '@/context/CarritoContext';
import { useRouter } from 'next/navigation';

export default function FinalizarCompra({ clienteId }) {
  const { finalizarCompra, carrito } = useCarrito();
  const [metodoDePago, setMetodoDePago] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setExito(null);
    if (!metodoDePago) {
      setError('Seleccioná un método de pago');
      return;
    }

    setLoading(true);
    try {
      const orden = await finalizarCompra(clienteId, metodoDePago);
      setExito(`¡Compra realizada! Número de orden: ${orden._id}`);
      router.push(`./checkout/success?msg=${encodeURIComponent(`¡Compra realizada! Número de orden: ${orden._id}`)}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!carrito || carrito.items.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold">Finalizar compra</h2>

      <label className="block text-sm font-medium text-gray-700">
        Método de pago
        <select
          value={metodoDePago}
          onChange={(e) => setMetodoDePago(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-300"
          required
        >
          <option value="">-- Elegí un método --</option>
          <option value="tarjeta">Tarjeta de crédito</option>
          <option value="debito">Tarjeta de débito</option>
          <option value="mercadoPago">MercadoPago</option>
          <option value="transferencia">Transferencia bancaria</option>
        </select>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {exito && <p className="text-sm text-green-600">{exito}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Finalizar compra'}
      </button>
    </form>
  );
}
