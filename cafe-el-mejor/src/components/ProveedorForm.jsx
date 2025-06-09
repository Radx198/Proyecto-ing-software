'use client';

import { useEffect, useState } from 'react';

export default function ProveedorForm({ initialData = null, onSubmit }) {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [nombreLegal, setNombreLegal] = useState(initialData.nombreLegal || '');
  const [direccionEmpresa, setDireccionEmpresa] = useState(initialData.direccionEmpresa || '');
  const [fechaInicioContrato, setFechaInicioContrato] = useState(initialData.fechaInicioContrato || '');
  const [fechaFinContrato, setFechaFinContrato] = useState(initialData.fechaFinContrato || '');
  const [fechaUltimaEntrega, setFechaUltimaEntrega] = useState(initialData.fechaUltimaEntrega || '');
  const [contacto, setContacto] = useState(initialData.contacto || '');
  const [productos, setProductos] = useState(initialData.productos || []);

  useEffect(() => {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => setProductosDisponibles(data));
  }, []);

  const handleAgregarProducto = () => {
    setProductos([...productos, { producto: '' }]);
  };

  const handleProductoChange = (index, value) => {
    const nuevos = [...productos];
    nuevos[index].producto = value;
    setProductos(nuevos);
  };

  const handleEliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombreLegal,
      direccionEmpresa,
      fechaInicioContrato,
      fechaFinContrato,
      fechaUltimaEntrega,
      contacto,
      productos,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="nombreLegal">
        Nombre
      </label>
      <input
        type="text"
        placeholder="Nombre Legal"
        className="w-full p-2 border rounded"
        value={nombreLegal}
        onChange={(e) => setNombreLegal(e.target.value)}
        required
      />
      <label htmlFor="direccion">
        Dirección
      </label>
      <input
        type="text"
        placeholder="Dirección de la Empresa"
        className="w-full p-2 border rounded"
        value={direccionEmpresa}
        onChange={(e) => setDireccionEmpresa(e.target.value)}
        required
      />
      <label htmlFor="fechaInicioContrato">
        Inicio del contrato
      </label>
      <input
        type="date"
        placeholder="Fecha de Inicio del Contrato"
        className="w-full p-2 border rounded"
        value={fechaInicioContrato}
        onChange={(e) => setFechaInicioContrato(e.target.value)}
        required
      />
      <label htmlFor="fechaFinContarto">
        Fin del contrato
      </label>
      <input
        type="date"
        placeholder="Fecha de Fin del Contrato"
        className="w-full p-2 border rounded"
        value={fechaFinContrato}
        onChange={(e) => setFechaFinContrato(e.target.value)}
        required
      />
      <label htmlFor="ultimaEntrega">
        Ultima Entrega
      </label>
      <input
        type="date"
        placeholder="Fecha de Última Entrega"
        className="w-full p-2 border rounded"
        value={fechaUltimaEntrega}
        onChange={(e) => setFechaUltimaEntrega(e.target.value)}
      />
      <label htmlFor="contacto">
        Ultima Entrega
      </label>
      <input
        type="text"
        placeholder="Contacto"
        className="w-full p-2 border rounded"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
        required
      />

      {/* Productos */}
      <label htmlFor="productos">
        Productos que provee:
      </label>
      <div className="space-y-2">
        {productos.map((item, index) => (
          <div key={index} className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded"
              value={item.producto}
              onChange={(e) => handleProductoChange(index, e.target.value)}
              required
            >
              <option value="">Producto</option>
              {productosDisponibles.map(p => (
                <option key={p._id} value={p._id}>
                  {p.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleEliminarProducto(index)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAgregarProducto}
          className="text-blue-600 underline text-sm"
        >
          + Agregar producto
        </button>
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar Proveedor
      </button>
    </form>
  );
}
