'use client';
import { useState } from 'react';

export default function ProveedorForm({ initialData = null, onSubmit }) {
  const [nombreLegal, setNombreLegal] = useState(initialData?.nombreLegal || '');
  const [direccion, setDireccion] = useState(initialData?.direccion || '');
  const [fechaInicio, setFechaInicio] = useState(initialData?.fechaInicio || '');
  const [fechaFin, setFechaFin] = useState(initialData?.fechaFin || '');
  const [fechaUltEntrega, setFechaUltEntrega] = useState(initialData?.fechaUltEntrega || '');
  const [contacto, setContacto] = useState(initialData?.contacto || '');
  const [productos, setProductos] = useState(initialData?.productos || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombreLegal, direccion, fechaInicio, fechaFin,
      fechaUltEntrega, contacto, productos
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Nombre Legal" className="input" value={nombreLegal} onChange={(e) => setNombreLegal(e.target.value)} required />
      <input type="text" placeholder="Dirección" className="input" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
      <input type="date" placeholder="Inicio Contrato" className="input" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
      <input type="date" placeholder="Fin Contrato" className="input" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
      <input type="date" placeholder="Última Entrega" className="input" value={fechaUltEntrega} onChange={(e) => setFechaUltEntrega(e.target.value)} />
      <input type="text" placeholder="Contacto" className="input" value={contacto} onChange={(e) => setContacto(e.target.value)} required />
      <textarea placeholder="Productos que suministra" className="input" value={productos} onChange={(e) => setProductos(e.target.value)} required />
      <button type="submit" className="btn-primary">Guardar Proveedor</button>
    </form>
  );
}
