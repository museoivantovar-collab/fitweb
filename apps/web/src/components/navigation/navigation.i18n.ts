import type { Locale } from "@/lib/i18n";

const navTranslations = {
  es: {
    nav: {
      home: "Inicio",
      sobre: "Sobre",
      sobreDropdown: {
        ivanTovar: "Iván Tovar",
        laFundacion: "La Fundación",
      },
      queHacemos: "Qué hacemos",
      queHacemosDropdown: {
        conservamos: "Conservamos",
        exponemos: "Exponemos",
        publicamos: "Publicamos",
      },
      noticias: "Noticias",
      archivoDigital: "Archivo digital",
      archivoDropdown: {
        obras: "Obras",
        audiovisuales: "Audiovisuales",
      },
      tienda: "Tienda",
      contacto: "Contacto",
    },
    footer: {
      navLabel: "Navegación",
      siguenos: "Síguenos",
      algunaDuda: "¿Alguna duda?",
      contactanos: "Contáctanos",
      links: {
        home: "Inicio",
        biografiaTovar: "Biografía de Tovar",
        sobreFundacion: "Sobre fundación",
        conservamos: "Conservamos",
        publicamos: "Publicamos",
        exponemos: "Exponemos",
        blogEditorial: "Blog editorial",
        archivoDigital: "Archivo digital",
        tienda: "Tienda",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      sobre: "About",
      sobreDropdown: {
        ivanTovar: "Iván Tovar",
        laFundacion: "The Foundation",
      },
      queHacemos: "What we do",
      queHacemosDropdown: {
        conservamos: "We conserve",
        exponemos: "We exhibit",
        publicamos: "We publish",
      },
      noticias: "News",
      archivoDigital: "Digital archive",
      archivoDropdown: {
        obras: "Works",
        audiovisuales: "Audiovisuals",
      },
      tienda: "Shop",
      contacto: "Contact",
    },
    footer: {
      navLabel: "Navigation",
      siguenos: "Follow us",
      algunaDuda: "Any questions?",
      contactanos: "Contact us",
      links: {
        home: "Home",
        biografiaTovar: "Tovar's biography",
        sobreFundacion: "About the foundation",
        conservamos: "We conserve",
        publicamos: "We publish",
        exponemos: "We exhibit",
        blogEditorial: "Editorial blog",
        archivoDigital: "Digital archive",
        tienda: "Shop",
      },
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      sobre: "À propos",
      sobreDropdown: {
        ivanTovar: "Iván Tovar",
        laFundacion: "La Fondation",
      },
      queHacemos: "Ce que nous faisons",
      queHacemosDropdown: {
        conservamos: "Nous conservons",
        exponemos: "Nous exposons",
        publicamos: "Nous publions",
      },
      noticias: "Actualités",
      archivoDigital: "Archive numérique",
      archivoDropdown: {
        obras: "Œuvres",
        audiovisuales: "Audiovisuels",
      },
      tienda: "Boutique",
      contacto: "Contact",
    },
    footer: {
      navLabel: "Navigation",
      siguenos: "Suivez-nous",
      algunaDuda: "Une question ?",
      contactanos: "Contactez-nous",
      links: {
        home: "Accueil",
        biografiaTovar: "Biographie de Tovar",
        sobreFundacion: "À propos de la fondation",
        conservamos: "Nous conservons",
        publicamos: "Nous publions",
        exponemos: "Nous exposons",
        blogEditorial: "Blog éditorial",
        archivoDigital: "Archive numérique",
        tienda: "Boutique",
      },
    },
  },
} satisfies Record<Locale, unknown>;

export function useNavTranslations(lang: Locale) {
  return navTranslations[lang];
}
