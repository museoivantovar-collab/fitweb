import type { Locale } from "@/lib/i18n";

const conservamosTranslations = {
  es: {
    pageTitle: "Conservamos",
    description:
      "Iván Tovar (1909–1998) fue un destacado artista dominicano y una de las figuras clave del abstraccionismo en América Latina.",
  },
  en: {
    pageTitle: "We Conserve",
    description:
      "Iván Tovar (1909–1998) was a prominent Dominican artist and one of the key figures of abstractionism in Latin America.",
  },
  fr: {
    pageTitle: "Nous Conservons",
    description:
      "Iván Tovar (1909–1998) était un éminent artiste dominicain et l'une des figures clés de l'abstractionnisme en Amérique latine.",
  },
} satisfies Record<Locale, unknown>;

export function useConservamosTranslations(lang: Locale) {
  return conservamosTranslations[lang];
}
