const STORAGE_KEY = 'productos';

export function getProductos() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProductos(productos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

export function addProducto(producto) {
  const productos = getProductos();
  productos.push(producto);
  saveProductos(productos);
}

export function updateProducto(id, nuevoProducto) {
  const productos = getProductos().map(p =>
    p.id === id ? { ...p, ...nuevoProducto } : p
  );
  saveProductos(productos);
}

export function deleteProducto(id) {
  const productos = getProductos().filter(p => p.id !== id);
  saveProductos(productos);
}

export function getProductoById(id) {
  return getProductos().find(p => p.id === id);
}
