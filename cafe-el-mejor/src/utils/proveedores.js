import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'proveedores';

export function getProveedores() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function getProveedorPorId(id) {
  return getProveedores().find((p) => p.id === id);
}

export function guardarProveedor(data) {
  const proveedores = getProveedores();
  const nuevo = { ...data, id: uuidv4() };
  proveedores.push(nuevo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proveedores));
}

export function actualizarProveedor(id, data) {
  const proveedores = getProveedores().map((p) => (p.id === id ? { ...p, ...data } : p));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proveedores));
}

export function eliminarProveedor(id) {
  const proveedores = getProveedores().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proveedores));
}
