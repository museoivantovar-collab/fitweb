// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

const SUPPORTED_LOCALES = ["es", "en", "fr"];

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "es",
    locales: SUPPORTED_LOCALES,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  output: "static",
});
