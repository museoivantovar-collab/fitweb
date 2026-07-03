import type { Locale } from "@/lib/i18n";

const generalTranslations = {
  es: {
    wheel: {
      scrollNote: "transición de color al scrollear",
      present: "presente",
      historyTitle: "La historia de Tovar",
    },
  },
  en: {
    wheel: {
      scrollNote: "color transition on scroll",
      present: "present",
      historyTitle: "The history of Tovar",
    },
  },
  fr: {
    wheel: {
      scrollNote: "transition de couleur au défilement",
      present: "présent",
      historyTitle: "L'histoire de Tovar",
    },
  },
} satisfies Record<Locale, unknown>;

export function useGeneralTranslations(lang: Locale) {
  return generalTranslations[lang];
}
