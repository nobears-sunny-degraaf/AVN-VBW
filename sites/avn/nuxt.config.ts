import { SiteKey } from "../../layers/base/app/types/site";

export default defineNuxtConfig({
  extends: ["../../layers/base"],

  components: [{ path: "storyblok", global: true, pathPrefix: false }],

  runtimeConfig: {
    public: {
      site: {
        key: SiteKey.Avn,
        label: "AVN",
      },
    },
  },

  devServer: {
    port: 3000,
  },
});
