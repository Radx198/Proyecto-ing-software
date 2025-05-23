import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'cobranzas';

export function getCobranzas() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function getCobranzaPorId(id) {
  return getCobranzas().find((c) => c.id === id);
}

export function guardarCobranza(data) {
  const cobranzas = getCobranzas();
  const nueva = { ...data, id: uuidv4() };
  cobranzas.push(nueva);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cobranzas));
}

export function actualizarCobranza(id, data) {
  const cobranzas = getCobranzas().map((c) => (c.id === id ? { ...c, ...data } : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cobranzas));
}

export function eliminarCobranza(id) {
  const cobranzas = getCobranzas().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cobranzas));
}
