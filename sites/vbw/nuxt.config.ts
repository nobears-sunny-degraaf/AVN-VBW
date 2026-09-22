import { SiteKey } from "../../layers/base/app/types/site";

export default defineNuxtConfig({
  extends: ["../../layers/base"],

  components: [{ path: "storyblok", global: true, pathPrefix: false }],

  runtimeConfig: {
    public: {
      site: {
        key: SiteKey.Vbw,
        label: "VBW",
      },
    },
  },

  devServer: {
    port: 3001,
  },
});
