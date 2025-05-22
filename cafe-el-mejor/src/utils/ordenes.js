import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'ordenes';

export function getOrdenes() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function getOrdenPorId(id) {
  return getOrdenes().find((o) => o.id === id);
}

export function guardarOrden(data) {
  const ordenes = getOrdenes();
  const nuevaOrden = { ...data, id: uuidv4(), fecha: new Date().toISOString() };
  ordenes.push(nuevaOrden);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenes));
}

export function actualizarOrden(id, data) {
  const ordenes = getOrdenes().map((o) => (o.id === id ? { ...o, ...data } : o));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenes));
}

export function eliminarOrden(id) {
  const ordenes = getOrdenes().filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordenes));
}
