import type { CollectionConfig } from "payload";

export const Galeria: CollectionConfig = {
  slug: "galeria",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["nombre", "año"],
  },
  fields: [
    {
      name: "nombre",
      type: "text",
      required: true,
    },
    {
      name: "año",
      type: "number",
      required: true,
    },
    {
      name: "imagen",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "descripcion",
      type: "textarea",
      localized: true,
    },
  ],
};
