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

const translations = {
  es: {
    common: {
      siteTitle: "Fundación Iván Tovar",
    },
  },
  en: {
    common: {
      siteTitle: "Iván Tovar Foundation",
    },
  },
  fr: {
    common: {
      siteTitle: "Fondation Iván Tovar",
    },
  },
} satisfies Record<Locale, unknown>;

export function useTranslations(lang: Locale) {
  return translations[lang];
}
