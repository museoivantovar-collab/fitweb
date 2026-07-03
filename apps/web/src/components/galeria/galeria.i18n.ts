import type { Locale } from "@/lib/i18n";

const galeriaTranslations = {
  es: {
    grid: {
      title: "Obras de Tovar",
      closeLabel: "Cerrar",
      expandLabel: "Ver obra",
    },
  },
  en: {
    grid: {
      title: "Works by Tovar",
      closeLabel: "Close",
      expandLabel: "View work",
    },
  },
  fr: {
    grid: {
      title: "Œuvres de Tovar",
      closeLabel: "Fermer",
      expandLabel: "Voir l'œuvre",
    },
  },
} satisfies Record<Locale, unknown>;

export function useGaleriaTranslations(lang: Locale) {
  return galeriaTranslations[lang];
}
