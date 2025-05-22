# ☕ Sistema de Gestión de Ventas y Compras "Café el Mejor"

Este es un sistema de gestión web construido con **Next.js 15**, **JavaScript**, **MongoDB** y **Tailwind CSS**, para administrar productos, clientes, facturas, órdenes de compra, cobranzas y proveedores.

---

## Tecnologías utilizadas

- [Next.js 15.6.2](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- JavaScript
- Local Storage
- UUID para generación de IDs
- Rutas protegidas con AuthGuard
- MongoDB como base de datos
- Mongoose para conectar la DB con Next

---

## Requisitos previos

- Node.js >= 18
- npm o yarn

---

## Instalación

1. Clonar el repo:

```bash
git clone https://github.com/Radx198/Proyecto-ing-software
cd cafe-el-mejor
```
## Entorno de desarrollo

2. Crear un archivo .env.local:

```.env.local
MONGODB_URI="URI_MONGODB"
```
3. Para levantar el entorno ejecutar:

```bash
npm i
npm run dev
```
Deberías poder navegar por el proyecto en: http://localhost:3000

## Acceso
La autentificación está simulada y los usuarios estan hardcodeados en /data/usuarios.json

admin → acceso completo

usuario: admin

contraseña: admin123

cliente → acceso limitado (por implementar)

## Funcionalidades ya implementadas
Autenticación
Simulado

AuthGuard: usado como wrapper para proteger las rutas.

Productos
- [x]  CRUD con metodo de pago
- [x]  Listado
- [ ]  Filtros

Clientes
- [x]  CRUD con metodo de pago
- [x]  Listado
- [ ]  Filtros

## Funcionalidades pendientes por implementar
🧾 Facturas
- [ ]  CRUD
- [ ]  Listado y filtros

💳 Cobranzas
 Registro con método de pago, cliente y producto
- [x]  CRUD con metodo de pago
- [x]  Listado
- [ ]  Filtros

📑 Órdenes de compra
- [ ]  CRUD con metodo de pago
- [ ]  Listado y filtros

🚚 Proveedores
- [ ]  CRUD con metodo de pago
- [ ]  Listado y filtros

🛡 Acceso por rol (parte del cliente)
- [ ]  Definir vistas y permisos específicos para usuarios tipo cliente

📁 Estructura del proyecto

```bash
/app/
├── login/
    ├── page.js
├── dashboard/
    ├── admin/
         ├── productos/
             ├── page.js
             ├── nuevo/
                 ├── page.js
             ├── [id]/
                 ├── editar/
                     ├── page.js
         ├── clientes/
             ├── page.js
             ├── nuevo/
                 ├── page.js
             ├── [id]/
                 ├── editar/
                     ├── page.js
        ├── page.js
    ├── cliente/
        ├── page.js
├── unauthorized/
    ├── page.js
├── layout.jsx
/components/
├── AuthGuard.jsx
├── ProductoForm.jsx
├── ClienteForm.jsx
├── Sidebar.jsx
/utils/
├── productos.js
├── clientes.js
├── auth.js
├── storage.js
```
