import type { Locale } from "@/lib/i18n";

const homeTranslations = {
  es: {
    hero: {
      subtitle: "te presenta la obra de Iván Tovar como nunca antes la has visto.",
    },
    noticiasPreview: {
      title: "Publicaciones y Actualidad",
      blogButton: "Visitar blog editorial",
    },
    tiendaPreview: {
      title: "Explora la colección",
      button: "Visita nuestra tienda",
    },
  },
  en: {
    hero: {
      subtitle: "presents Iván Tovar's work like you've never seen it before.",
    },
    noticiasPreview: {
      title: "Publications & News",
      blogButton: "Visit editorial blog",
    },
    tiendaPreview: {
      title: "Explore the collection", // TODO: translate
      button: "Visit our store", // TODO: translate
    },
  },
  fr: {
    hero: {
      subtitle: "vous présente l'œuvre d'Iván Tovar comme vous ne l'avez jamais vue.",
    },
    noticiasPreview: {
      title: "Publications & Actualité",
      blogButton: "Visiter le blog éditorial",
    },
    tiendaPreview: {
      title: "Explorer la collection", // TODO: translate
      button: "Visiter notre boutique", // TODO: translate
    },
  },
} satisfies Record<Locale, unknown>;

export function useHomeTranslations(lang: Locale) {
  return homeTranslations[lang];
}
