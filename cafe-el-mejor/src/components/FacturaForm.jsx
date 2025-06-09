'use client';

import { useEffect, useState } from 'react';

export default function OrdenForm({ initialData = null, onSubmit }) {
    const [identificacion, setIdentificacion] = useState('');
    const [error, setError] = useState('');
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState(initialData?.cliente || '');
    const [metodoDePago, setMetodoDePago] = useState(initialData?.metodoDePago || '');
    const [monto, setMonto] = useState(0);

    useEffect(() => {
        fetch('/api/clientes')
            .then(res => res.json())
            .then(data => setClientes(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ identificacion, cliente, metodoDePago, monto });
    };

    const handleFactura = (e) => {
        const value = e.target.value;
        const formatted = 'F-0' + value;

        if (value && !/^[0-9]{4}-[0-9]{4}$/.test(value)) {
            setError('El formato debe ser XXXX-XXXX (X => Números).');
        } else {
            setError('');
        }

        setIdentificacion(formatted);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="w-full p-2 border border-gray-200 bg-white rounded ">
                <label className="block mb-2">Identificación:</label>
                <div className="flex items-center w-full border border-gray-200 bg-gray-50 rounded">
                    <span className="px-2 bg-gray-200 border-r min-w-max h-full">F-0</span>
                    <input
                        type="text"
                        placeholder="XXXX-XXXX"
                        className="w-full p-2"
                        value={identificacion.replace(/^F-0/, '')}
                        onChange={handleFactura}
                        required
                    />
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <select
                className="w-full p-2 border border-gray-200 rounded"
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

            <select
                type="text"
                placeholder="Método de pago"
                className="w-full p-2 border border-gray-200 rounded"
                value={metodoDePago}
                onChange={(e) => setMetodoDePago(e.target.value)}
                required
            >
                <option value="">Seleccionar Método de Pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="debito">Tarjeta de Débito</option>
                <option value="tarjeta">Tarjeta de Crédito</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="mercadoPago">Mercado Pago</option>
            </select>

            <div className="w-full p-2 border border-gray-200 rounded bg-white">
                <label className="block mb-2">Monto Total: {'($)'}</label>
                <input
                    type="number"
                    placeholder="Monto Total"
                    className="w-full p-2 border border-gray-200 bg-gray-50 rounded"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Registrar Factura
            </button>
        </form>
    );
}
