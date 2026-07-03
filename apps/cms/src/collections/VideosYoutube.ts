import type { CollectionConfig } from "payload";

export const VideosYoutube: CollectionConfig = {
  slug: "videos-youtube",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "youtubeId", "orden", "updatedAt"],
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The YouTube video ID (e.g. dQw4w9WgXcQ)",
      },
    },
    {
      name: "orden",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
