# InventaFlow — Inventario y ventas

Aplicación de gestión de inventario y ventas desarrollada con **Next.js 16, TypeScript, React 19, Tailwind CSS 4** y Vibe Coding con ChatGPT. Incluye interfaz responsive, validación, manejo de carga/errores y API interna.

## Funciones y rutas

| Ruta | Descripción |
|---|---|
| `/` | Dashboard con indicadores y ventas de los últimos 7 días |
| `/productos` | Inventario: crear, editar, buscar, filtrar y eliminar |
| `/ventas` | Registro de ventas con descuento de stock |
| `/reportes` | Indicadores, ranking y ganancia estimada |
| `/configuracion` | Estado de conexión y guía técnica |

API: `GET/POST /api/products`, `PATCH/DELETE /api/products/:id`, `GET/POST /api/sales`, `GET /api/summary`.

## Requisitos
- Node.js **20.9+** (se recomienda Node.js 22 LTS o superior)
- npm
- Proyecto Supabase para persistencia en producción

## Instalación
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd inventa-flow
npm install
cp .env.example .env.local   # En Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```
Abre http://localhost:3000.

## Configurar Supabase
1. Crea un proyecto en https://supabase.com.
2. Abre **SQL Editor** y ejecuta el archivo `supabase/schema.sql`.
3. En Project Settings > API copia la URL y la **service_role / secret key**.
4. Completa `.env.local` (nunca lo subas a GitHub):
   ```env
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=tu_clave_secreta
   ```
5. Configura además `ADMIN_USERNAME` y `ADMIN_PASSWORD` para proteger el acceso a todas las rutas y APIs. En producción **son obligatorias**: sin ellas la app responde 401.
6. Reinicia el servidor de desarrollo.
7. Crea algunos productos desde la interfaz y registra ventas.

**Sin estas variables**, la aplicación se inicia en **modo demostración** con productos y ventas de ejemplo. En ese modo las modificaciones solo viven en la memoria del proceso y se perderán al reiniciar o al desplegar en un entorno serverless. Para una entrega funcional persistente, usa Supabase.

## Verificar calidad
```bash
npm run typecheck
npm run lint
npm run build
```

## Despliegue en Vercel
1. Crea un repositorio público GitHub y sube este código (sin `.env.local`).
2. En https://vercel.com > Add New > Project importa tu repositorio.
3. Agrega `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USERNAME` y `ADMIN_PASSWORD` en **Project Settings > Environment Variables**.
4. Pulsa **Deploy** y comprueba todas las rutas y una venta real.
5. Actualiza aquí la URL pública: **PENDIENTE DE DESPLIEGUE**.

## Seguridad y alcance
Este es un MVP **académico de un solo administrador** protegido con autenticación HTTP Basic en `proxy.ts` (sobre HTTPS en producción). La cuenta de administración es compartida y no cuenta con sesiones individuales ni roles: no es un sistema listo para usos comerciales o multiusuario. Para un uso real incorpora autenticación robusta, autorización por negocio, protección CSRF apropiada, rate limiting, auditoría y costos históricos. No despliegues en HTTP sin TLS. El servicio de Supabase se utiliza **solo del lado del servidor**; no se envía la clave secreta al navegador. El cálculo de utilidad en reportes es aproximado y usa el costo actual del artículo.

## Estructura
```text
app/                 Páginas App Router y Route Handlers
components/          Shell, UI y hook de consumo de API
lib/                 Tipos, validación, datos demo y acceso a Supabase
supabase/schema.sql  Esquema y función transaccional de ventas
VIBE_CODING.md       Evidencia de prompts e iteraciones
```

## Proceso Vibe Coding
Ver [VIBE_CODING.md](./VIBE_CODING.md).

## Publicación paso a paso desde Windows PowerShell

1. Extrae el ZIP, abre la carpeta `inventa-flow` en VS Code y ejecuta:
   ```powershell
   npm install
   Copy-Item .env.example .env.local
   # Edita .env.local con credenciales reales y contraseñas fuertes
   npm run typecheck
   npm run lint
   npm run build
   npm run dev
   ```
2. Revisa `http://localhost:3000` y realiza las pruebas indicadas en `VIBE_CODING.md`.
3. Crea un repositorio **vacío** en GitHub, después ejecuta:
   ```powershell
   git init
   git add .
   git commit -m "feat: base de inventario y ventas con Next.js"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/inventa-flow.git
   git push -u origin main
   ```
4. Importa el repositorio en Vercel, configura las cuatro variables y despliega. Comprueba la URL pública, la solicitud de usuario/contraseña y un ciclo completo de venta.

**Nota de evaluación:** Un primer commit con todo el proyecto no demuestra iteraciones históricas anteriores. Registra los cambios que efectivamente hagas después con commits descriptivos; nunca inventes commits o comprobaciones.
