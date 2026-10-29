# ColComex

Aplicación para orientar a personas y empresas en operaciones de comercio exterior. El repositorio reúne el backend REST, el frontend Next.js y las páginas estáticas originales que siguen disponibles como referencia.

## Componentes

- [`backend/README.md`](./backend/README.md): API en Node.js, Express, TypeScript, Prisma y PostgreSQL.
- [`frontend/README.md`](./frontend/README.md): aplicación Next.js App Router, TypeScript y Tailwind CSS.
- `paginappal/` y `productos/`: versión estática anterior.

## Funcionalidades

- Catálogo público de numerales con filtros y paginación.
- Registro, inicio de sesión y roles de usuario y administrador.
- Formularios autenticados de importación y exportación, con interacciones vinculadas al usuario y al numeral del catálogo.
- Formulario público de contacto con los campos definidos para el proyecto.
- Consulta de solicitudes propias y vista administrativa de las interacciones.

## Desarrollo local

Configura primero PostgreSQL y el backend siguiendo [la guía de la API](./backend/README.md). Inicia el servidor del backend en `http://localhost:3001`. Después configura `NEXT_PUBLIC_API_HOST` y ejecuta la aplicación web desde el directorio `frontend`:

```powershell
npm install
npm run dev
```

La aplicación web queda disponible en `http://localhost:3000`. Las variables de entorno y las credenciales se mantienen en archivos locales no versionados.

## Comprobaciones

Desde `backend`:

```powershell
npm run typecheck
npm run build
```

Desde `frontend`:

```powershell
npm run lint
npm run build
```

## Estado de entrega

La aplicación está preparada para verificación local. El despliegue público y la separación en repositorios independientes aún requieren configurar los proyectos de hosting, las URL finales y los secretos de producción en las cuentas correspondientes. No se incluyen credenciales de prueba ni secretos en este repositorio.
