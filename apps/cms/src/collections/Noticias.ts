import type { CollectionConfig } from "payload";

export const Noticias: CollectionConfig = {
  slug: "noticias",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "fecha", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "extracto",
      type: "textarea",
      localized: true,
    },
    {
      name: "contenido",
      type: "richText",
      localized: true,
    },
    {
      name: "imagen",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "fecha",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "categoria",
      type: "select",
      options: [
        { label: "Actualidad", value: "actualidad" },
        { label: "Publicaciones", value: "publicaciones" },
        { label: "Eventos", value: "eventos" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
