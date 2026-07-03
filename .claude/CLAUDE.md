# I18n Rule — Components and Sections

## Supported Languages
- `es` (default), `en`, `fr`
- Locale validation and shared types live in `apps/web/src/lib/i18n.ts`

## Architecture: Distributed i18n Files

Translations are **not** centralized in a single global file. Each page and
each self-contained component group owns its own `*.i18n.ts` file colocated
with its components.

```
src/
  lib/
    i18n.ts                        ← locale types, validation helpers ONLY
  components/
    navigation/
      Navbar.astro
      Footer.astro
      navigation.i18n.ts           ← strings for the navigation group
    about-foundation/
      HeroSection.astro
      MembersCarousel.astro
      Service.astro
      ServiceSection.astro
      about-foundation.i18n.ts     ← strings for this page's sections
    contact/
      ContactForm.astro
      contact.i18n.ts
```

Every page or component group gets exactly one `[scope].i18n.ts` file.
Never merge strings from different pages/groups into the same file.
Never create a single global translations file.

## `src/lib/i18n.ts` — Shared Types and Helpers Only

This file exports the locale primitives used everywhere. It contains
**no translation strings**.

```ts
export const SUPPORTED_LOCALES = ["es", "en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isValidLocale(lang: string): lang is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang);
}

/** Returns a 404 response object for invalid locales */
export function guardLocale(lang: string): Response | null {
  if (!isValidLocale(lang)) {
    return new Response(null, { status: 404 });
  }
  return null;
}
```

## Structure of a Scoped `*.i18n.ts` File

Each scoped file follows the same pattern: a private typed object named
`[scope]Translations` and a single exported function `use[Scope]Translations`.

```ts
// components/navigation/navigation.i18n.ts
import type { Locale } from '@/lib/i18n'

const navigationTranslations = {
  es: {
    home: "Inicio",
    about: "Sobre nosotros",
  },
  en: {
    home: "Home",
    about: "About us",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
  },
} satisfies Record<Locale, unknown>;

export function useNavigationTranslations(lang: Locale) {
  return navigationTranslations[lang];
}
```

The `satisfies Record<Locale, unknown>` ensures all three languages are
always present. TypeScript will error if a locale is missing.

### Naming convention

| File | Internal variable | Exported function |
|---|---|---|
| `navigation.i18n.ts` | `navigationTranslations` | `useNavigationTranslations` |
| `about.i18n.ts` | `aboutTranslations` | `useAboutTranslations` |
| `contact.i18n.ts` | `contactTranslations` | `useContactTranslations` |

The scope is derived from the **filename** (without `.i18n.ts`), not from
the full folder name. `about-foundation/about.i18n.ts` → scope `about`.

## Usage in Page-Level Astro Components

```astro
---
import { guardLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { useAboutTranslations } from './about.i18n'

const { lang } = Astro.params
const guard = guardLocale(lang)
if (guard) return guard

const t = useAboutTranslations(lang as Locale)
---

<h1>{t.hero.title}</h1>
<p>{t.hero.subtitle}</p>
```

## Usage in Child Components (lang as prop)

Child components within a group receive `lang` as a typed prop and import
from their group's i18n file directly.

```astro
---
import type { Locale } from '@/lib/i18n'
import { useNavigationTranslations } from './navigation.i18n'

interface Props {
  lang: Locale
}

const { lang } = Astro.props
const t = useNavigationTranslations(lang)
---

<button>{t.home}</button>
```

Never type `lang` as `string`. Always use the `Locale` type imported
from `src/lib/i18n.ts`.

Note: `t` is a plain object — use dot notation (`t.hero.title`),
not a function call (`t('hero.title')`). This gives full TypeScript
autocomplete on every key.

## Adding Strings for a New Component or Section

1. Locate (or create) the `*.i18n.ts` file for the page/group the
   component belongs to
2. Add the new keys under the `es` block first
3. Add the exact same keys in `en` and `fr` — all three blocks must
   stay structurally identical or TypeScript will error
4. Never leave a key missing in any language — use an empty string
   and add a `// TODO: translate` comment if the translation is not ready
5. Never hardcode visible UI strings directly in a component

## What Does NOT Belong in Any i18n File

Editorial content (post titles, member biographies, exhibition descriptions)
comes from Payload CMS with its own localized fields. i18n files only cover
static UI strings: navigation labels, buttons, form labels, placeholders,
error messages, and generic SEO metadata.

## Checklist When Creating a New Component

- [ ] Does it have visible text? → add keys in all three locales in the
      group's `*.i18n.ts` file (create it if it doesn't exist yet)
- [ ] Does it belong to a page or component group? → use that group's
      scoped i18n file, never the global `lib/i18n.ts`
- [ ] Does it receive lang as a prop? → type it as `Locale`, not `string`
- [ ] Is dot notation used instead of a function call for `t`?
- [ ] Are all three locale blocks structurally identical?
- [ ] Is editorial content coming from Payload instead of being hardcoded?

## Lottie Animation Rule

# Package
@lottiefiles/dotlottie-web is already installed in apps/web. Do not install
lottie-web or any other Lottie package. Do not import from the LottieFiles
platform or consume any external Lottie URLs at runtime.

# File Storage
All Lottie files live in apps/web/public/lottie/. This makes them available
as static assets served directly by Cloudflare Pages with a stable URL path.
Never place Lottie files inside src/assets/ — Vite would attempt to process
them as modules, breaking the src string passed to DotLottie.
Prefer .lottie (dotLottie format) over .json when exporting from the
design tool. dotLottie files are ~10× smaller than their JSON equivalents.
Use .json only for files that cannot be exported in dotLottie format.
apps/web/
  public/
    lottie/
      hero-animation.lottie
      conservamos-icon.lottie
      loader.json             ← .json only when .lottie is unavailable
  src/
    components/
      ui/
        LottiePlayer.astro    ← single reusable component
LottiePlayer.astro — The Only Lottie Component
There is exactly one Lottie component. Do not create per-section Lottie
wrappers. All animation instances go through this single component.
astro---
// src/components/ui/LottiePlayer.astro
interface Props {
  src: string;        // e.g. '/lottie/hero-animation.lottie'
  loop?: boolean;
  autoplay?: boolean;
  class?: string;
}

const {
  src,
  loop = true,
  autoplay = true,
  class: className,
} = Astro.props;

const id = `lottie-${Math.random().toString(36).slice(2, 7)}`;
---

<canvas id={id} class={className}></canvas>

<script define:vars={{ id, src, loop, autoplay }}>
  import { DotLottie } from '@lottiefiles/dotlottie-web';

  const canvas = document.getElementById(id);
  if (canvas) {
    new DotLottie({ canvas, src, loop, autoplay });
  }
</script>
Usage:
astro<LottiePlayer
  src="/lottie/hero-animation.lottie"
  loop={true}
  autoplay={true}
  class="w-32 h-32"
/>

# Scroll-Driven Animations (GSAP Integration)
When a Lottie animation must be controlled by scroll progress, disable
autoplay and drive the frame manually via setFrame() inside a
ScrollTrigger callback. Never let both GSAP and autoplay run
simultaneously on the same instance.
astro---
// Example: scroll-driven Lottie inside a section component
---

<canvas id="lottie-conservamos" class="w-48 h-48"></canvas>

<script>
  import { DotLottie } from '@lottiefiles/dotlottie-web';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById('lottie-conservamos');
  const player = new DotLottie({
    canvas,
    src: '/lottie/conservamos-icon.lottie',
    loop: false,
    autoplay: false,
  });

  player.addEventListener('load', () => {
    const totalFrames = player.totalFrames;

    ScrollTrigger.create({
      trigger: '#section-conservamos',
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        player.setFrame(self.progress * totalFrames);
      },
    });
  });
</script>
Use LottiePlayer.astro for autoplay instances. Use an inline <script>
block (as above) for scroll-driven instances that require access to the
DotLottie instance after creation.

# Rules Summary
Files go in public/lottie/, never in src/assets/
Prefer .lottie over .json
One reusable component: src/components/ui/LottiePlayer.astro
Autoplay instances → use LottiePlayer.astro
Scroll-driven instances → inline <script> with setFrame() + ScrollTrigger
Never run autoplay: true and ScrollTrigger.setFrame() on the same instance
Never import from external Lottie URLs or the LottieFiles platform
