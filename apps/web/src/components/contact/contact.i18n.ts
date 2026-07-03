import type { Locale } from "@/lib/i18n";

const contactTranslations = {
  es: {
    pageTitle: "Contacto",
    newsletter: {
      title: "Newsletter",
      description:
        "Mantente al tanto de las últimas exposiciones, publicaciones y noticias de la Fundación Iván Tovar. Suscríbete y recibe nuestra selección directamente en tu correo.",
      stayUpdated: "Mantente actualizado",
      emailPlaceholder: "Correo electrónico",
      subscribe: "Suscribirse",
      successMessage: "¡Gracias! Te has suscrito correctamente.",
      alreadySubscribed: "Este correo ya está suscrito.",
      errorMessage: "Algo salió mal. Por favor intenta de nuevo.",
    },
  },
  en: {
    pageTitle: "Contact",
    newsletter: {
      title: "Newsletter",
      description:
        "Stay up to date with the latest exhibitions, publications, and news from the Iván Tovar Foundation. Subscribe and receive our selection directly in your inbox.",
      stayUpdated: "Stay updated",
      emailPlaceholder: "Email address",
      subscribe: "Subscribe",
      successMessage: "Thank you! You've been subscribed.",
      alreadySubscribed: "This email is already subscribed.",
      errorMessage: "Something went wrong. Please try again.",
    },
  },
  fr: {
    pageTitle: "Contact",
    newsletter: {
      title: "Newsletter",
      description:
        "Restez informé des dernières expositions, publications et actualités de la Fondation Iván Tovar. Abonnez-vous et recevez notre sélection directement dans votre boîte mail.",
      stayUpdated: "Restez informé",
      emailPlaceholder: "Adresse e-mail",
      subscribe: "S'abonner",
      successMessage: "Merci ! Vous êtes maintenant abonné.",
      alreadySubscribed: "Cet e-mail est déjà abonné.",
      errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
    },
  },
} satisfies Record<Locale, unknown>;

export function useContactTranslations(lang: Locale) {
  return contactTranslations[lang];
}
