import type { Locale } from "@/lib/i18n";

const exponemosTranslations = {
  es: {
    pageTitle: "Exponemos",
    description:
      "Organización de exposiciones a nivel nacional e internacional. Alianzas con museos, galerías e instituciones culturales.",
    imageAlt: "Portada de",
    detail: {
      salir: "Salir",
      explorarGaleria: "Explorar galería",
      leerMas: "Leer más",
      fecha: "fecha",
      ubicacion: "ubicación",
    },
  },
  en: {
    pageTitle: "We Exhibit",
    description:
      "Organization of exhibitions at national and international level. Partnerships with museums, galleries, and cultural institutions.",
    imageAlt: "Cover image for",
    detail: {
      salir: "Exit",
      explorarGaleria: "Explore gallery",
      leerMas: "Read more",
      fecha: "date",
      ubicacion: "location",
    },
  },
  fr: {
    pageTitle: "Nous Exposons",
    description:
      "Organisation d'expositions au niveau national et international. Partenariats avec des musées, galeries et institutions culturelles.",
    imageAlt: "Image de couverture pour",
    detail: {
      salir: "Quitter",
      explorarGaleria: "Explorer la galerie",
      leerMas: "Lire plus",
      fecha: "date",
      ubicacion: "lieu",
    },
  },
} satisfies Record<Locale, unknown>;

export function useExponemosTranslations(lang: Locale) {
  return exponemosTranslations[lang];
}
