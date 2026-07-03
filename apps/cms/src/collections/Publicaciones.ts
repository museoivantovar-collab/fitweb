import type { CollectionConfig } from "payload";

export const Publicaciones: CollectionConfig = {
  slug: "publicaciones",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "orden", "updatedAt"],
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
      ],
    },
    {
      name: "dimensiones",
      type: "text",
      localized: true,
    },
    {
      name: "paginas",
      type: "number",
    },
    {
      name: "detalleImpresion",
      type: "text",
      localized: true,
    },
    {
      name: "tiendaUrl",
      type: "text",
    },
    {
      name: "documentalTitulo",
      type: "text",
      localized: true,
    },
    {
      name: "documentalUrl",
      type: "text",
    },
    {
      name: "orden",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
