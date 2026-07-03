import type { Locale } from "@/lib/i18n";

const contactFormTranslations = {
  es: {
    heading: "Contáctanos para:",
    tabs: {
      conservacion: "Conservación",
      certificar: "Certificar",
      preguntas: "Preguntas",
    },
    fields: {
      nombre: "Nombre",
      correo: "Correo electrónico",
      detalle: "Detalle su situación",
      subirImagen: "Subir imagen",
    },
    submit: "Enviar",
  },
  en: {
    heading: "Contact us for:",
    tabs: {
      conservacion: "Conservation",
      certificar: "Certification",
      preguntas: "Questions",
    },
    fields: {
      nombre: "Name",
      correo: "Email address",
      detalle: "Describe your situation",
      subirImagen: "Upload image",
    },
    submit: "Send",
  },
  fr: {
    heading: "Contactez-nous pour :",
    tabs: {
      conservacion: "Conservation",
      certificar: "Certification",
      preguntas: "Questions",
    },
    fields: {
      nombre: "Nom",
      correo: "Adresse e-mail",
      detalle: "Décrivez votre situation",
      subirImagen: "Télécharger une image",
    },
    submit: "Envoyer",
  },
} satisfies Record<Locale, unknown>;

export function useContactFormTranslations(lang: Locale) {
  return contactFormTranslations[lang];
}
