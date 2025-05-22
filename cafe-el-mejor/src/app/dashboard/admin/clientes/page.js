'use client';

import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getClientes, deleteCliente } from '@/utils/clientes';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setClientes(getClientes());
  }, []);

  const handleDelete = (id) => {
    deleteCliente(id);
    setClientes(getClientes());
  };

  const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="clientes/nuevo" className="bg-darkgreen text-white px-4 py-2 rounded">Nuevo <AddIcon /></Link>
      </div>

      <input
        className="input mb-4 w-full"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <ul className="space-y-2">
        {filtrados.map(cliente => (
          <li key={cliente.id} className="border p-4 rounded flex justify-between items-start">
            <div>
              <h2 className="font-bold">{cliente.nombre}</h2>
              <p>{cliente.email}</p>
              <p>{cliente.telefono} | {cliente.direccion}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/clientes/${cliente.id}/editar`} className="text-blue-600">Editar</Link>
              <button onClick={() => handleDelete(cliente.id)} className="text-red-600">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
