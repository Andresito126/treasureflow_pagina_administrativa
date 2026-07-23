# TreasureFlow — Panel de administración web

Panel de administración (desktop-first, responsive) para que el equipo de TreasureFlow
supervise la plataforma: usuarios, publicaciones y recolecciones/transacciones.

- **UI en español**, **código en inglés**.
- **Modo claro / oscuro** con la paleta exacta de la app móvil (primario `#418839`).
- **Fase 1 (actual): datos mock.** La capa de datos está aislada para conectar el backend
  real en la Fase 2 sin tocar la UI.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 3 · React Router 7 · Recharts ·
Material Symbols · fuentes Geist + Inter.

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # tsc + build de producción
npm run lint      # oxlint
npm run preview   # sirve el build
```

## Arquitectura — Clean Architecture + Slice (feature) Architecture

Cada feature es un slice vertical con las capas de Clean Architecture. La regla de
dependencia apunta hacia adentro: `presentation → application → domain`, y
`infrastructure` implementa las interfaces del `domain`.

```
src/
├── app/            # shell: rutas, guard de sesión, layout (sidebar, topbar)
├── core/           # infraestructura transversal
│   ├── config/       env tipado (VITE_ADMIN_EMAILS, VITE_GATEWAY_URL)
│   ├── theme/        proveedor de tema claro/oscuro
│   ├── http/         cliente HTTP (para Fase 2)
│   └── di/           composition root: arma repo → usecase y lo provee por contexto
├── shared/         # UI kit, toasts, utils y vocabulario de dominio compartido
├── mocks/          # seeds de datos (usuarios, publicaciones, recolecciones, dashboard)
└── features/
    ├── auth/  dashboard/  users/  posts/  collections/
    └── <feature>/
        ├── domain/          # entidades + interfaces de repositorio (contratos)
        ├── application/     # casos de uso (una clase por acción)
        ├── infrastructure/  # implementación Mock* del repositorio (lee de /mocks)
        └── presentation/    # páginas, componentes y hooks controladores
```

### Regla de capas clave

Los **controladores de presentación** (`useUsers`, `usePosts`, …) dependen **solo de
casos de uso** expuestos por el contenedor de DI — nunca de un repositorio directo.
El contenedor (`core/di/container.ts`) es el único lugar que instancia repositorios y
los inyecta en los casos de uso.

## Fase 2 (backend real) — qué cambiar

1. Crear implementaciones API de los repositorios en cada `features/*/infrastructure/`
   (usando `core/http/httpClient.ts` y el JWT del login).
2. Cambiar las instancias `Mock*` por las de API **únicamente** en
   `core/di/container.ts`.
3. Login: `POST {GATEWAY_URL}/api/v1/auth/login` → valida el email contra
   `VITE_ADMIN_EMAILS` (no existe rol admin en el backend todavía).
4. Endpoints admin pendientes de crear: `GET /admin/users`,
   `PATCH /admin/users/:id/status`, `DELETE /admin/users/:id`, `GET /admin/posts`,
   `DELETE /admin/posts/:id`, `GET /admin/collections`, `GET /admin/stats`.

Copia `.env.example` a `.env` para configurar el entorno.
