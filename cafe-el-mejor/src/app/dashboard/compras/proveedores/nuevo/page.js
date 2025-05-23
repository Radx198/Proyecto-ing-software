'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [form, setForm] = useState({
    nombre: '',
    direccionEmpresa: '',
    fechaInicio: '',
    fechaFin: '',
    fechaUltimaEntrega: '',
    contacto: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/dashboard/admin/proveedores');
  };

  const labels = {
    nombre: 'Nombre',
    direccionEmpresa: 'Dirección de la Empresa',
    fechaInicio: 'Inicio de contrato',
    fechaFin: 'Fin de contrato',
    fechaUltimaEntrega: 'Última entrega',
    contacto: 'Contacto',
  };

  return (
    <main className="p-4 max-w-xl mx-auto flex-1">
      <h1 className="text-xl font-bold mb-4">Nuevo Proveedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium" htmlFor={field}>
              {labels[field]}
            </label>
            <input
              id={field}
              name={field}
              type={
                ['fechaInicio', 'fechaFin', 'fechaUltimaEntrega'].includes(field)
                  ? 'date'
                  : 'text'
              }
              placeholder={labels[field]}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar Proveedor
        </button>
      </form>
    </main>
  );
}
