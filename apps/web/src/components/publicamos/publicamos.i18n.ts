import type { Locale } from "@/lib/i18n";

const publicamosTranslations = {
  es: {
    pageTitle: "Publicamos",
    description:
      "Iván Tovar (1909–1998) fue un destacado artista dominicano y una de las figuras clave del surrealismo en América Latina.",
    imageAlt: "Portada de",
    accordion: {
      visitarTienda: "Visitar en la tienda",
      documentalPrefix: "Documental",
    },
    viewer: {
      modelo3d: "Modelo 3D",
      imagenes: "Imágenes",
      sinImagenes: "Sin imágenes disponibles",
    },
    meta: {
      dimensiones: "Dimensiones",
      paginas: "páginas",
      impresion: "Impresión",
    },
  },
  en: {
    pageTitle: "We Publish",
    description:
      "Iván Tovar (1909–1998) was a prominent Dominican artist and one of the key figures of surrealism in Latin America.",
    imageAlt: "Cover of",
    accordion: {
      visitarTienda: "Visit in the shop",
      documentalPrefix: "Documentary",
    },
    viewer: {
      modelo3d: "3D Model",
      imagenes: "Images",
      sinImagenes: "No images available",
    },
    meta: {
      dimensiones: "Dimensions",
      paginas: "pages",
      impresion: "Print",
    },
  },
  fr: {
    pageTitle: "Nous Publions",
    description:
      "Iván Tovar (1909–1998) était un éminent artiste dominicain et l'une des figures clés du surréalisme en Amérique latine.",
    imageAlt: "Couverture de",
    accordion: {
      visitarTienda: "Visiter en boutique",
      documentalPrefix: "Documentaire",
    },
    viewer: {
      modelo3d: "Modèle 3D",
      imagenes: "Images",
      sinImagenes: "Aucune image disponible",
    },
    meta: {
      dimensiones: "Dimensions",
      paginas: "pages",
      impresion: "Impression",
    },
  },
} satisfies Record<Locale, unknown>;

export function usePublicamosTranslations(lang: Locale) {
  return publicamosTranslations[lang];
}
