import { SpeedInsights } from "@vercel/speed-insights/nuxt";

export default defineNuxtConfig({
  devtools: { enabled: false },
  target: "static",

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Lato",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
        },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  buildModules: ["@nuxtjs/sitemap", SpeedInsights],

  build: {
    transpile: ["lucide-vue-next"],
  },

  sitemap: {
    hostname: "https://www.mybarathon.fr",
    gzip: true,
    routes: [],
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-08-19",
});
