# Evidencia del proceso Vibe Coding

**Proyecto:** InventaFlow — inventario y ventas  
**IA utilizada:** ChatGPT (copiloto)  
**Fecha inicial:** 20 de noviembre de 2026  
**Estudiante:** Completar nombre antes de entregar

> Este registro describe la generación inicial realizada con IA. Los apartados de verificaciones, correcciones posteriores, commits y despliegue deben completarse con resultados reales. No se inventaron ejecuciones ni URLs públicas.

## 1. Concepción inicial

Se eligió una aplicación web para una tienda de ropa y accesorios, con necesidades de control de existencias, productos categorizados, precios y ventas. Se priorizó una interfaz clara con datos verificables y un sistema de ventas que no permita stock negativo.

## 2. Prompts principales utilizados

**Prompt 1 — Alcance del proyecto**
> Crea una aplicación completa de inventario y ventas para una tienda de ropa y accesorios, que cumpla una actividad de Next.js 16+ con App Router, TypeScript, mínimo cuatro rutas, API, Server y Client Components, useState, useEffect, responsive, estados de loading y error, GitHub y Vercel.

**Prompt 2 — Arquitectura y modelos**
> Diseña una arquitectura simple con App Router y Route Handlers, tipos Product y Sale, validación de entradas y capa de datos que soporte Supabase; crea un modo demo claramente identificado.

**Prompt 3 — Interfaz de usuario**
> Genera un dashboard profesional responsive, con barra lateral, KPIs, gráfico semanal, tabla de ventas, catálogo con filtros y modal de formularios; utiliza Tailwind y estilos de diseño propios.

**Prompt 4 — Flujo de ventas y confiabilidad**
> Implementa el registro de una venta descontando stock de forma atómica en PostgreSQL para evitar inconsistencias; valida cantidades y conserva el precio al momento de la venta.

**Prompt 5 — Calidad y entrega**
> Añade loading/error UI, metadatos, README, .env.example, esquema SQL y documento de proceso de Vibe Coding con honestidad sobre las pruebas realizadas.

## 3. Iteraciones y decisiones técnicas

| Iteración | Decisión o cambio | Motivo |
|---|---|---|
| 1 | Next.js App Router + TypeScript | Satisfacer requisitos y asegurar tipado |
| 2 | Cinco páginas y navegación lateral responsive | Cubrir las cuatro rutas mínimas y mejorar UX |
| 3 | Route Handlers + hook `useData` con useState y useEffect | Desacoplar interfaz y operaciones del servidor |
| 4 | Supabase REST con clave exclusivamente del servidor | Persistencia sin SDK adicional y secreto protegido |
| 5 | Función SQL `register_sale` transaccional | Actualizar stock y registrar la venta atómicamente |
| 6 | Modo demo en memoria explícito | Permitir explorar la app sin configurar credenciales |
| 7 | Manejo de errores de API y UI de carga | Mejorar resiliencia y experiencia de usuario |
| 8 | Autenticación HTTP Basic en `proxy.ts` para web y API | Evitar escritura anónima en el despliegue público |
| 9 | Propagar errores del procedimiento SQL de ventas | Mostrar el verdadero motivo de un error sin ocultarlo |

## 4. Desafíos y soluciones

- **Persistencia en Vercel:** la memoria del servidor no es persistente. Solución: Supabase como base de datos real y demo solo para previsualización.
- **Ventas concurrentes:** descontar stock desde JavaScript en varios requests puede provocar carreras. Solución: operación SQL transaccional con bloqueo de fila.
- **Credenciales:** la service role no puede llegar al cliente. Solución: acceso a Supabase exclusivamente desde `lib/store.ts` en rutas del servidor.
- **Errores visibles:** operaciones pueden fallar o no tener datos. Solución: mensajes de error, estados de carga, tablas vacías y reintento.

## 5. Validación a completar por el estudiante

- [ ] `npm install` sin errores
- [ ] `npm run typecheck` sin errores
- [ ] `npm run lint` sin errores
- [ ] `npm run build` sin errores
- [ ] Cinco rutas funcionan desde móvil y escritorio
- [ ] Crear, editar, buscar y eliminar producto
- [ ] Registrar venta y comprobar descuento de stock en Supabase
- [ ] Intentar venta con stock insuficiente y comprobar rechazo
- [ ] Ver el estado de carga y probar manejo de errores
- [ ] Capturas de pantalla de ejecución real

## 6. Git y despliegue: completar con evidencias reales

Commits sugeridos (realizar al avanzar, sin falsificar historial):
1. `chore: configurar next 16 typescript y tailwind`
2. `feat: crear dashboard y navegacion responsive`
3. `feat: agregar gestion de productos y api`
4. `feat: implementar ventas y base de datos supabase`
5. `feat: incorporar reportes y estados de error`
6. `docs: documentar flujo vibe coding y despliegue`

**Repositorio GitHub:** PENDIENTE  
**URL Vercel:** PENDIENTE  
**Fecha de despliegue:** PENDIENTE

## 7. Reflexión

La IA ayudó a convertir los requisitos funcionales en componentes y rutas, pero el desarrollador sigue siendo responsable de probar el código, revisar la seguridad, verificar los resultados, integrar las credenciales y documentar el proceso real de despliegue. Los prompts son evidencia de colaboración, no sustituyen pruebas.

## Iteración de seguridad previa al despliegue

**Prompt:** «Revisa las rutas API para evitar que un desconocido pueda modificar productos y ventas cuando la aplicación se publique en Vercel; protege también las páginas y no expongas claves secretas».

**Decisión:** incorporar protección HTTP Basic en `proxy.ts`. En producción no se permite acceso sin `ADMIN_USERNAME` y `ADMIN_PASSWORD` configurados. Se mantiene como solución temporal para la evaluación, no como autenticación comercial multiusuario.

**Verificaciones pendientes:** instalación, compilación y revisión en navegador; no declarar aprobadas hasta ejecutarlas realmente.
