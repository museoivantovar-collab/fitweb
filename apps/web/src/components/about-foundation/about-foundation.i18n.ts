import type { Locale } from "@/lib/i18n";

const aboutTranslations = {
  es: {
    hero: {
      title: "Sobre la Fundación",
      p1: "La Fundación Iván Tovar es una entidad cultural y educativa sin fines de lucro, establecida en 2012 con la misión de preservar, promover, difundir la obra de Iván Tovar y contribuir al desarrollo del arte y la cultura en la República Dominicana.",
      p2: "Desde su labor curatorial, educativa y editorial, la Fundación trabaja por proyectar el legado de Tovar tanto en el ámbito nacional como internacional, fomentando la sensibilidad artística y el pensamiento crítico.",
    },
    services: {
      conservamos: {
        title: "Conservamos",
        description:
          "Gestión y preservación del legado artístico de Iván Tovar. Digitalización y documentación de su obra.",
      },
      exponemos: {
        title: "Exponemos",
        description:
          "Organización de exposiciones a nivel nacional e internacional. Alianzas con museos, galerías e instituciones culturales.",
      },
      publicamos: {
        title: "Publicamos",
        description: "Desarrollo de publicaciones y catálogos especializados.",
      },
    },
    members: {
      sectionTitle: "Nuestro equipo",
    },
  },
  en: {
    hero: {
      title: "About the Foundation",
      p1: "The Iván Tovar Foundation is a non-profit cultural and educational entity, established in 2012 with the mission of preserving, promoting, and disseminating the work of Iván Tovar, and contributing to the development of art and culture in the Dominican Republic.",
      p2: "Through its curatorial, educational, and editorial work, the Foundation strives to project Tovar's legacy both nationally and internationally, fostering artistic sensitivity and critical thinking.",
    },
    services: {
      conservamos: {
        title: "We Conserve",
        description:
          "Management and preservation of Iván Tovar's artistic legacy. Digitization and documentation of his work.",
      },
      exponemos: {
        title: "We Exhibit",
        description:
          "Organization of exhibitions at national and international level. Partnerships with museums, galleries, and cultural institutions.",
      },
      publicamos: {
        title: "We Publish",
        description: "Development of specialized publications and catalogues.",
      },
    },
    members: {
      sectionTitle: "Our team",
    },
  },
  fr: {
    hero: {
      title: "À propos de la Fondation",
      p1: "La Fondation Iván Tovar est une entité culturelle et éducative à but non lucratif, fondée en 2012 avec pour mission de préserver, promouvoir et diffuser l'œuvre d'Iván Tovar, et de contribuer au développement de l'art et de la culture en République Dominicaine.",
      p2: "À travers son travail curatorial, éducatif et éditorial, la Fondation s'efforce de projeter l'héritage de Tovar à l'échelle nationale et internationale, en favorisant la sensibilité artistique et la pensée critique.",
    },
    services: {
      conservamos: {
        title: "Nous conservons",
        description:
          "Gestion et préservation du patrimoine artistique d'Iván Tovar. Numérisation et documentation de son œuvre.",
      },
      exponemos: {
        title: "Nous exposons",
        description:
          "Organisation d'expositions au niveau national et international. Partenariats avec des musées, galeries et institutions culturelles.",
      },
      publicamos: {
        title: "Nous publions",
        description: "Développement de publications et de catalogues spécialisés.",
      },
    },
    members: {
      sectionTitle: "Notre équipe",
    },
  },
} satisfies Record<Locale, unknown>;

export function useAboutTranslations(lang: Locale) {
  return aboutTranslations[lang];
}
