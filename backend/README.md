# API de ColComex

API REST de Node.js, Express, TypeScript, Prisma y PostgreSQL. Este directorio es el backend de desarrollo; si la entrega requiere repositorios independientes, se debe publicar como un repositorio propio.

## Requisitos

- Node.js 20 o superior y npm.
- PostgreSQL local o una base PostgreSQL administrada.

## Configuración local

1. Crea una base de datos PostgreSQL llamada `proyecto_comex` (por ejemplo, en pgAdmin: **Databases → Create → Database**).
2. Desde este directorio, instala dependencias:

   ```powershell
   npm install
   ```

3. Copia `.env.example` a `.env` y configura `DATABASE_URL` con tu usuario, contraseña y base. Reemplaza `JWT_SECRET` por un secreto aleatorio de al menos 32 caracteres. No compartas ni subas `.env`.
4. Genera el cliente, ejecuta la migración y carga el catálogo:

   ```powershell
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run db:seed
   ```

   El seed reutiliza los numerales de `../productos/numerales-productos.js`. Para crear cuentas de prueba, completa `SEED_ADMIN_*` y `SEED_USER_*` en `.env`; usa contraseñas propias de al menos 12 caracteres.
5. Inicia el servidor:

   ```powershell
   npm run dev
   ```

   La API queda disponible en `http://localhost:3001`; verifica `/health`.

## Guardar solicitudes de importación y exportación

Abre las páginas `productos/formulario-importaciones.html` o `productos/formulario-exportaciones.html` usando Live Server en `http://127.0.0.1:5500` o `http://localhost:5500`. Inicia sesión o crea una cuenta en el panel de acceso de la página; luego diligencia el formulario y pulsa **Guardar y generar formulario**. La sesión se conserva solo en la pestaña actual. Cada solicitud se guarda como una interacción asociada a la cuenta autenticada.

Para consultar las solicitudes en pgAdmin, abre `Databases → proyecto_comex → Schemas → public → Tables`, haz clic derecho en `interacciones` y elige **View/Edit Data → All Rows**. También puedes abrir **Tools → Query Tool** y ejecutar:

```sql
SELECT type, data, created_at
FROM public.interacciones
ORDER BY created_at DESC;
```

La columna `data` contiene los campos del formulario en formato JSON. Los formularios almacenan datos identificativos y comerciales: usa únicamente información de prueba mientras desarrollas y restringe el acceso a la base de datos.

El formulario público **Contáctenos** también guarda las solicitudes, sin requerir una cuenta, en `public.solicitudes_contacto`. Para consultarlas en pgAdmin, abre esa tabla con **View/Edit Data → All Rows**. La descripción del caso se almacena en `respuestas` como JSON.

Las tablas de la base usan nombres en español: `usuarios`, `elementos_catalogo`, `interacciones` y `solicitudes_contacto`. La migración de renombrado conserva los registros y las relaciones existentes.

## Endpoints

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | Autenticado |
| GET | `/api/catalogo?page=1&pageSize=10&category=exportaciones&direction=INGRESOS&search=café` | Público |
| GET | `/api/catalogo/:id` | Público |
| POST, PUT, DELETE | `/api/catalogo` y `/api/catalogo/:id` | Solo admin |
| POST | `/api/interaccion` | Autenticado |
| GET | `/api/interaccion/mias` | Autenticado; solo interacciones propias |
| GET | `/api/interaccion` | Solo admin |

El registro siempre asigna el rol `USER`; el cliente no puede otorgarse permisos de administrador. Las interacciones toman el ID del usuario autenticado, nunca del cuerpo de la petición. El login devuelve un JWT con el ID como `sub` y el rol; envía el token con `Authorization: Bearer <token>`.

Las respuestas de catálogo usan `{ pagination, data }`. Las respuestas de error no incluyen stack traces. CORS permite únicamente los orígenes configurados en `CORS_ORIGINS`.

## Despliegue

Configura `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT` y `CORS_ORIGINS` como variables del servicio. Ejecuta `npm run build` para compilar y `npm run prisma:deploy` para aplicar migraciones en producción; inicia con `npm start`. No uses las credenciales de desarrollo ni guardes secretos en GitHub.
