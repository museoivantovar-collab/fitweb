import type { CollectionConfig } from "payload";

export const Miembros: CollectionConfig = {
  slug: "miembros",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["nombre", "cargo", "orden"],
  },
  fields: [
    {
      name: "nombre",
      type: "text",
      required: true,
    },
    {
      name: "cargo",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "richText",
      localized: true,
    },
    {
      name: "foto",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "orden",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "redesSociales",
      type: "group",
      fields: [
        { name: "instagram", type: "text" },
        { name: "twitter", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "website", type: "text" },
      ],
    },
  ],
};
