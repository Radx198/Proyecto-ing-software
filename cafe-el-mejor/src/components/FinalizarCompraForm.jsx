import { useState } from 'react';
import { useCarrito } from '@/context/CarritoContext';

export default function FinalizarCompra({ clienteId }) {
  const { finalizarCompra, carrito } = useCarrito();
  const [metodoDePago, setMetodoDePago] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

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
      setExito(`Compra realizada! Número de orden: ${orden._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!carrito || carrito.items.length === 0) {
    return <p>Tu carrito está vacío</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Finalizar compra</h2>

      <label className="block">
        Método de pago:
        <select
          value={metodoDePago}
          onChange={e => setMetodoDePago(e.target.value)}
          className="mt-1 block w-full border p-2 rounded"
          required
        >
          <option value="">-- Elegí un método --</option>
          <option value="tarjeta">Tarjeta de crédito</option>
          <option value="mercadoPago">MercadoPago</option>
          <option value="transferencia">Transferencia bancaria</option>
        </select>
      </label>

      {error && <p className="text-red-600">{error}</p>}
      {exito && <p className="text-green-600">{exito}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Finalizar compra'}
      </button>
    </form>
  );
}
