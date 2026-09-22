import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const certDir = fileURLToPath(new URL("../../.certs/", import.meta.url));
const cert = `${certDir}localhost.pem`;
const key = `${certDir}localhost-key.pem`;
const hasTrustedCert = existsSync(cert) && existsSync(key);

if (!hasTrustedCert) {
  console.warn(
    "[base] No mkcert certificate in .certs — falling back to a self-signed one. The Storyblok Visual Editor will refuse to load it. Run `npm run certs`.",
  );
}

export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },

  modules: ["@nuxt/ui", "@storyblok/nuxt"],

  alias: {
    "#base": fileURLToPath(new URL("./app", import.meta.url)),
  },

  css: [fileURLToPath(new URL("./app/assets/css/main.css", import.meta.url))],

  components: [
    { path: "components" },
    { path: "storyblok", global: true, pathPrefix: false },
  ],

  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    componentsDir: "",
    apiOptions: {
      region: process.env.STORYBLOK_REGION || "eu",
    },
  },

  ssr: true,

  devServer: {
    https: hasTrustedCert ? { cert, key } : true,
  },
});
