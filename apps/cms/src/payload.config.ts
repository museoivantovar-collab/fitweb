import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Media } from "./collections/Media";
import { Noticias } from "./collections/Noticias";
import { Exposiciones } from "./collections/Exposiciones";
import { Miembros } from "./collections/Miembros";
import { Publicaciones } from "./collections/Publicaciones";
import { Users } from "./collections/Users";
import { Obras } from "./collections/Obras";
import { Galeria } from "./collections/Galeria";
import { VideosYoutube } from "./collections/VideosYoutube";
import { seedObras } from "./seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Noticias, Exposiciones, Miembros, Publicaciones, Obras, Galeria, VideosYoutube],

  editor: lexicalEditor(),

  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
    ],
    defaultLocale: "es",
    fallback: true,
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL ?? "noreply@fundacion.org",
    defaultFromName: "Fundación",
    apiKey: process.env.RESEND_API_KEY ?? "",
  }),

  secret: process.env.PAYLOAD_SECRET ?? "change-me-in-production",

  typescript: {
    outputFile: path.resolve(dirname, "../../packages/types/src/payload-types.ts"),
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",

  cors: [
    process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:4321",
  ],

  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },

  onInit: async (payload) => {
    const { totalDocs } = await payload.count({ collection: "obras" });
    if (totalDocs === 0) {
      await seedObras(payload);
    }
  },
});
