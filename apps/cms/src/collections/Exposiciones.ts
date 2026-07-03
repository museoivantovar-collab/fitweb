import type { CollectionConfig } from "payload";

export const Exposiciones: CollectionConfig = {
  slug: "exposiciones",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "fechaInicio", "fechaFin", "updatedAt"],
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
      name: "descripcion",
      type: "richText",
      localized: true,
    },
    {
      name: "imagenPortada",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "galeria",
      type: "array",
      fields: [
        {
          name: "imagen",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "descripcion",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "fechaInicio",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "fechaFin",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "lugar",
      type: "text",
      localized: true,
    },
  ],
};
