# Fundación — Project Context

## Overview

Website for a foundation. Features a blog, animated elements, member directory with biographies, and multilingual support. A separate Shopify store handles e-commerce; the website only links to it.

---

## Monorepo Structure

```
fundacion/
├── apps/
│   ├── web/          # Astro → Cloudflare Pages
│   └── cms/          # Payload CMS → Railway
├── packages/
│   └── types/        # Shared types generated from Payload schemas
├── pnpm-workspace.yaml
└── package.json
```

Package manager: **pnpm workspaces**

---

## Stack

### Frontend — `apps/web`
| Layer | Tool |
|---|---|
| Framework | Astro |
| Styling | Tailwind CSS |
| Animations | GSAP |
| Lottie | Lottie format files (no Lottie platform) |
| Deployment | Cloudflare Pages |

- Build command: `pnpm --filter web build`
- Root directory: `apps/web`
- Consumes CMS via REST API

### CMS — `apps/cms`
| Layer | Tool |
|---|---|
| CMS | Payload CMS |
| Database | PostgreSQL |
| Deployment | Railway |
| Admin URL | `cms.fundacion.org` (CNAME → Railway) |

- Start command: `pnpm --filter cms start`
- Two Railway services: Payload Node server + PostgreSQL instance

### Shared
| Layer | Tool |
|---|---|
| Types | `packages/types` — generated from Payload schemas |
| Email | Resend |
| Store | Shopify (external link only, not embedded) |

---

## Internationalization

- **Default:** Spanish (`es`)
- **Supported:** English (`en`), French (`fr`)
- Blog posts and subpages should be localized (Payload localization + Astro i18n routing)

### Routing Strategy

Todas las páginas viven bajo `src/pages/[lang]/`, donde `[lang]` es el parámetro de idioma (`es`, `en`, `fr`). Esto garantiza un único archivo por página sin duplicación.

`src/pages/index.astro` actúa únicamente como redirector: redirige inmediatamente a `/es` (idioma por defecto), sin renderizar contenido propio.

```
src/pages/
├── index.astro                        # Redirect → /es
└── [lang]/
    ├── index.astro                    # Landing page
    ├── sobre-tovar.astro
    ├── sobre-fundacion.astro
    ├── conservamos.astro
    ├── exponemos/
    │   ├── index.astro
    │   ├── [slug].astro
    │   └── [slug]/
    │       └── galeria.astro
    ├── publicamos.astro
    ├── noticias/
    │   ├── index.astro
    │   └── [slug].astro
    └── contacto.astro
```

`[lang]` se valida en cada página contra los locales soportados (`es`, `en`, `fr`); si el valor no es válido se retorna 404.

---

## Site Structure

```
/                          → Redirect a /es
/es/                       → Landing page (default)
/es/sobre-tovar
/es/sobre-fundacion
/es/conservamos
/es/exponemos
/es/exponemos/[slug]
/es/exponemos/[slug]/galeria
/es/publicamos
/es/noticias
/es/noticias/[slug]
/es/contacto

/en/* y /fr/*              → Misma estructura con idioma correspondiente
```

---

## Infrastructure Rules

- Frontend: **Cloudflare Pages only** (never Vercel, never Railway)
- CMS: **Railway only**
- Never consolidate both apps into one platform
- All shared types live exclusively in `packages/types` — never duplicated in app-level code
- Shopify is an external link; no Shopify SDK is installed in this repo

---

## Key Patterns

- **Data fetching:** Astro fetches from Payload REST API at build time (static) or on-demand (SSR where needed)
- **Type safety:** Payload generates collection types → exported from `packages/types` → imported in `apps/web`
- **Animations:** GSAP handles scroll-triggered and entrance animations; Lottie handles icon/illustration animations via `.json` or `.lottie` files stored locally
- **Email:** Resend is used for contact form submission (triggered from Astro API route or Payload hook)
- **Localization strategy:** Payload stores localized fields per collection; Astro usa `[lang]` routing con `src/pages/index.astro` redirigiendo a `/es`; un único archivo por página cubre todos los idiomas
