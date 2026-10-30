# API de ColComex

API REST de Node.js, Express, TypeScript, Prisma y PostgreSQL. Este directorio es el backend de desarrollo; si la entrega requiere repositorios independientes, se debe publicar como un repositorio propio.

## Arquitectura

El backend separa responsabilidades en cuatro capas:

- `src/domain`: entidades, contratos de repositorio, roles y errores de aplicación.
- `src/application`: casos de uso para autenticación, catálogo, interacciones y solicitudes de contacto.
- `src/infrastructure`: adaptadores de Prisma/PostgreSQL, bcrypt, JWT y configuración.
- `src/interface/http`: composición de dependencias, rutas Express, validación de entrada, autenticación y respuestas HTTP.

Las rutas no acceden directamente a Prisma: invocan servicios de aplicación que usan los contratos del dominio.

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
4. Genera el cliente, aplica las migraciones incluidas y carga el catálogo:

   ```powershell
   npm run prisma:generate
   npm run prisma:deploy
   npm run db:seed
   ```

   El seed reutiliza los numerales de `../productos/numerales-productos.js`. Para crear cuentas de prueba, completa `SEED_ADMIN_*` y `SEED_USER_*` en `.env`; usa contraseñas propias de al menos 12 caracteres.
5. Inicia el servidor:

   ```powershell
   npm run dev
   ```

   La API queda disponible en `http://localhost:3001`; verifica `/health`.

## Guardar solicitudes de importación y exportación

Abre las páginas `productos/formulario-importaciones.html` o `productos/formulario-exportaciones.html` usando Live Server en `http://127.0.0.1:5500` o `http://localhost:5500`. Inicia sesión o crea una cuenta en el panel de acceso de la página; luego diligencia el formulario y pulsa **Guardar y generar formulario**. La sesión se conserva solo en la pestaña actual. Cada solicitud se guarda como una interacción asociada a la cuenta autenticada y al elemento activo del catálogo seleccionado.

Para consultar las solicitudes en pgAdmin, abre `Databases → proyecto_comex → Schemas → public → Tables`, haz clic derecho en `interacciones` y elige **View/Edit Data → All Rows**. También puedes abrir **Tools → Query Tool** y ejecutar:

```sql
SELECT type, data, created_at
FROM public.interacciones
ORDER BY created_at DESC;
```

La columna `data` contiene los campos del formulario en formato JSON. Los formularios almacenan datos identificativos y comerciales: usa únicamente información de prueba mientras desarrollas y restringe el acceso a la base de datos.

El formulario público **Contáctenos** guarda las solicitudes en `public.solicitudes_contacto`. Si la persona tiene una sesión iniciada al enviarla, queda asociada a su cuenta y aparece en **Mis solicitudes**; sin sesión, el envío sigue permitido, pero no se vincula a una cuenta. Para consultarlas en pgAdmin, abre esa tabla con **View/Edit Data → All Rows**. La descripción del caso se almacena en `respuestas` como JSON.

Las tablas de la base usan nombres en español: `usuarios`, `elementos_catalogo`, `interacciones` y `solicitudes_contacto`. Las migraciones de renombrado conservan los registros y las relaciones existentes.

## Endpoints

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | Autenticado |
| POST | `/api/auth/admins` | Solo admin; registrar otro administrador |
| GET | `/api/catalogo?page=1&pageSize=10&category=exportaciones&direction=INGRESOS&search=café` | Público |
| GET | `/api/catalogo/:id` | Público |
| POST, PUT, DELETE | `/api/catalogo` y `/api/catalogo/:id` | Solo admin |
| POST | `/api/contacto` | Público; opcionalmente autenticado para asociar la solicitud a la cuenta |
| GET | `/api/contacto/mias` | Autenticado; solo solicitudes de contacto propias |
| GET | `/api/contacto` | Solo admin; listar solicitudes recibidas |
| POST | `/api/interaccion` | Autenticado |
| GET | `/api/interaccion/mias` | Autenticado; solo interacciones propias |
| GET | `/api/interaccion` | Solo admin |

El registro siempre asigna el rol `USER`; el cliente no puede otorgarse permisos de administrador. Las interacciones toman el ID del usuario autenticado, nunca del cuerpo de la petición, y quedan vinculadas por llaves foráneas al usuario y al elemento del catálogo elegido. El login devuelve un JWT con los claims `id` y `role`; envíalo como `Authorization: Bearer <token>`. Para mantener compatibilidad temporal, la API también puede leer tokens anteriores que usaban `sub`.

Las respuestas de catálogo usan `{ pagination, data }`. Las respuestas de error no incluyen stack traces. CORS permite únicamente los orígenes configurados en `CORS_ORIGINS`.

### Ejemplos de autorización

Sin token o con un token inválido, un endpoint privado responde `401`:

```json
{ "error": { "code": "UNAUTHORIZED", "message": "Debes iniciar sesión para realizar esta acción." } }
```

Una cuenta con rol `USER` que intente administrar el catálogo recibe `403`:

```json
{ "error": { "code": "FORBIDDEN", "message": "No tienes permiso para realizar esta acción." } }
```

Para crear el primer administrador local, configura `SEED_ADMIN_*` en el `.env` y vuelve a ejecutar el seed. Una vez dentro del panel `/admin`, un administrador autenticado puede registrar otras cuentas administrativas. No hay credenciales administrativas predeterminadas en el código.

## Despliegue

Configura `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT` y `CORS_ORIGINS` como variables del servicio. Ejecuta `npm run build` para compilar y `npm run prisma:deploy` para aplicar migraciones en producción; inicia con `npm start`. No uses las credenciales de desarrollo ni guardes secretos en GitHub.
