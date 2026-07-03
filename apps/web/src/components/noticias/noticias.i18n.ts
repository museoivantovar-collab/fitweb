import type { Locale } from "@/lib/i18n";

const noticiasTranslations = {
  es: {
    pageTitle: "Noticias",
    filters: {
      all: "Todo",
      actualidad: "Actualidad",
      publicaciones: "Publicaciones",
      eventos: "Eventos",
    },
    noResults: "No hay noticias.",
    readMore: "Leer más",
    backLabel: "Volver",
  },
  en: {
    pageTitle: "News",
    filters: {
      all: "All",
      actualidad: "Current Affairs",
      publicaciones: "Publications",
      eventos: "Events",
    },
    noResults: "No news.",
    readMore: "Read more",
    backLabel: "Back",
  },
  fr: {
    pageTitle: "Nouvelles",
    filters: {
      all: "Tout",
      actualidad: "Actualité",
      publicaciones: "Publications",
      eventos: "Événements",
    },
    noResults: "Pas de nouvelles.",
    readMore: "Lire la suite",
    backLabel: "Retour",
  },
} satisfies Record<Locale, unknown>;

export function useNoticiasTranslations(lang: Locale) {
  return noticiasTranslations[lang];
}
