const STORAGE_KEY = 'clientes';

export function getClientes() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveClientes(clientes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}

export function addCliente(cliente) {
  const clientes = getClientes();
  clientes.push(cliente);
  saveClientes(clientes);
}

export function updateCliente(id, nuevoCliente) {
  const clientes = getClientes().map(c =>
    c.id === id ? { ...c, ...nuevoCliente } : c
  );
  saveClientes(clientes);
}

export function deleteCliente(id) {
  const clientes = getClientes().filter(c => c.id !== id);
  saveClientes(clientes);
}

export function getClienteById(id) {
  return getClientes().find(c => c.id === id);
}
