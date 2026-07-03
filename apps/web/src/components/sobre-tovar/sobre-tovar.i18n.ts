import type { Locale } from "@/lib/i18n";

const sobreTovarTranslations = {
  es: {
    biography: {
      heading: "Iván Tovar",
      paragraph1:
        "Iván Tovar (1942–2020) es una de las figuras más emblemáticas del arte dominicano contemporáneo y un referente clave del surrealismo en América Latina. Con una trayectoria artística que trasciende fronteras, Tovar desarrolló un lenguaje visual único que fusiona la tradición surrealista europea con una sensibilidad profundamente caribeña, dando lugar a un imaginario onírico, sensorial y cargado de simbolismo.",
      paragraph2:
        "Formado en París durante los años 60, Iván Tovar fue parte del vibrante ambiente artístico de la capital francesa, donde estableció relaciones con importantes figuras del arte y la literatura. Su obra, reconocida por su dominio técnico, profundidad conceptual y potencia estética, ha sido expuesta en prestigiosas galerías y museos de Europa, América y el Caribe, consolidando su lugar en la historia del arte global.",
      paragraph3:
        "A lo largo de su carrera, Tovar exploró temas como la dualidad cuerpo-mente, la transformación, la sexualidad y el subconsciente, a través de una iconografía que desafía las convenciones y estimula la imaginación. Sus composiciones, de marcada atmósfera introspectiva y misteriosa, reflejan una búsqueda constante de libertad expresiva y espiritual.",
    },
  },
  en: {
    biography: {
      heading: "Iván Tovar",
      paragraph1:
        "Iván Tovar (1942–2020) is one of the most iconic figures of contemporary Dominican art and a key reference for Surrealism in Latin America. With a career that transcends borders, Tovar developed a unique visual language that fuses European Surrealist tradition with a deeply Caribbean sensibility, giving rise to a dreamlike, sensory imagery charged with symbolism.",
      paragraph2:
        "Trained in Paris during the 1960s, Iván Tovar was part of the vibrant artistic scene of the French capital, where he established relationships with important figures in art and literature. His work, recognized for its technical mastery, conceptual depth, and aesthetic power, has been exhibited in prestigious galleries and museums across Europe, the Americas, and the Caribbean.",
      paragraph3:
        "Throughout his career, Tovar explored themes such as the body-mind duality, transformation, sexuality, and the subconscious, through an iconography that challenges convention and stimulates the imagination. His compositions, marked by an introspective and mysterious atmosphere, reflect a constant search for expressive and spiritual freedom.",
    },
  },
  fr: {
    biography: {
      heading: "Iván Tovar",
      paragraph1:
        "Iván Tovar (1942–2020) est l'une des figures les plus emblématiques de l'art dominicain contemporain et une référence clé du surréalisme en Amérique latine. Avec une carrière qui transcende les frontières, Tovar a développé un langage visuel unique qui fusionne la tradition surréaliste européenne avec une sensibilité profondément caribéenne, donnant naissance à un imaginaire onirique, sensoriel et chargé de symbolisme.",
      paragraph2:
        "Formé à Paris dans les années 60, Iván Tovar faisait partie du vibrant environnement artistique de la capitale française, où il a établi des liens avec d'importantes figures de l'art et de la littérature. Son œuvre, reconnue pour sa maîtrise technique, sa profondeur conceptuelle et sa puissance esthétique, a été exposée dans de prestigieuses galeries et musées d'Europe, d'Amérique et des Caraïbes.",
      paragraph3:
        "Tout au long de sa carrière, Tovar a exploré des thèmes tels que la dualité corps-esprit, la transformation, la sexualité et le subconscient, à travers une iconographie qui défie les conventions et stimule l'imagination. Ses compositions, marquées par une atmosphère introspective et mystérieuse, reflètent une recherche constante de liberté expressive et spirituelle.",
    },
  },
} satisfies Record<Locale, unknown>;

export function useSobreTovarTranslations(lang: Locale) {
  return sobreTovarTranslations[lang];
}
