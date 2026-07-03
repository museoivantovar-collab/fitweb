import type { Locale } from "@/lib/i18n";

const audiovisualTranslations = {
  es: {
    videoGrid: {
      title: "Audiovisuales",
      playLabel: "Reproducir video",
      closeLabel: "Cerrar video",
    },
  },
  en: {
    videoGrid: {
      title: "Audiovisuals",
      playLabel: "Play video",
      closeLabel: "Close video",
    },
  },
  fr: {
    videoGrid: {
      title: "Audiovisuels",
      playLabel: "Lire la vidéo",
      closeLabel: "Fermer la vidéo",
    },
  },
} satisfies Record<Locale, unknown>;

export function useAudiovisualTranslations(lang: Locale) {
  return audiovisualTranslations[lang];
}
