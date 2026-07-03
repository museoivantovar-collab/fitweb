import type { Locale } from "@/lib/i18n";

const wipTranslations = {
  es: {
    pageTitle: "Sitio en construcción",
    hero: {
      title: "Website en construcción",
      subtitle: "Síguenos en nuestras redes sociales o escríbenos directamente con tu solicitud.",
    },
  },
  en: {
    pageTitle: "Site under construction",
    hero: {
      title: "Website under construction",
      subtitle: "Follow us on social media or write to us directly with your request.",
    },
  },
  fr: {
    pageTitle: "Site en construction",
    hero: {
      title: "Site en construction",
      subtitle: "Suivez-nous sur nos réseaux sociaux ou écrivez-nous directement avec votre demande.",
    },
  },
} satisfies Record<Locale, unknown>;

export function useWipTranslations(lang: Locale) {
  return wipTranslations[lang];
}
