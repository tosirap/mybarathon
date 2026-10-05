export default defineNuxtConfig({
  devtools: { enabled: false },

  site: {
    url: "https://www.mybarathon.fr",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      title: "MyBarathon – Barathon et bière pong à Strasbourg",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Barathons, bières pong et soirées dans les bars de Strasbourg et d'Alsace. Découvre les prochains événements MyBarathon et réserve ta place.",
        },
        {
          name: "keywords",
          content:
            "barathon, Strasbourg, Alsace, bars, événement, bière, bière-pong, soirée, étudiants",
        },
        { name: "author", content: "MyBarathon" },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large",
        },
        { name: "theme-color", content: "#fef9c3" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "MyBarathon" },
        { property: "og:locale", content: "fr_FR" },
        {
          property: "og:title",
          content: "MyBarathon – Barathon et bière pong à Strasbourg",
        },
        {
          property: "og:description",
          content:
            "Barathons, bières pong et soirées dans les bars de Strasbourg et d'Alsace. Réserve ta place pour le prochain événement.",
        },
        {
          property: "og:image",
          content: "https://www.mybarathon.fr/images/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "MyBarathon, barathons et événements à Strasbourg",
        },
        { property: "og:url", content: "https://www.mybarathon.fr/" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "MyBarathon – Barathon et bière pong à Strasbourg",
        },
        {
          name: "twitter:description",
          content:
            "Barathons, bières pong et soirées dans les bars de Strasbourg et d'Alsace.",
        },
        {
          name: "twitter:image",
          content: "https://www.mybarathon.fr/images/og-image.png",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/images/logo.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap",
        },
      ],
    },
  },

  modules: [
    "@nuxt/image",
    [
      "@nuxtjs/tailwindcss",
      {
        configPath: "~/tailwind.config.js",
        cssPath: "~/assets/css/main.css",
        exposeConfig: false,
        viewer: false,
      },
    ],
    "@nuxtjs/sitemap",
    "@nuxtjs/supabase",
  ],

  sitemap: {
    exclude: ["/admin", "/admin/**"],
  },

  routeRules: {
    "/admin": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  },

  nitro: {
    preset: "vercel",
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    publicAssets: [{ baseURL: "/assets", dir: "public" }],
    prerender: {
      routes: ["/"],
      failOnError: false,
    },
    esbuild: {
      options: {
        target: "es2020",
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
      },
    },
    minify: true,
  },

  image: {
    provider: "ipx",
    ipx: {
      modifiers: {
        format: "webp",
        quality: 80,
      },
    },
    domains: [],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
    },
  },

  build: {
    transpile: ["lucide-vue-next"],
    analyze: true,
  },

  vite: {
    optimizeDeps: {
      include: ["tailwindcss", "lucide-vue-next"],
    },
    css: {
      devSourcemap: false,
    },
    build: {
      minify: "esbuild",
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ["console.log"],
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, "/");

            if (normalizedId.includes("/node_modules/lucide-vue-next/")) {
              return "lucide";
            }

            if (
              ["vue", "vue-router", "@nuxt/kit"].some((dependency) =>
                normalizedId.includes(`/node_modules/${dependency}/`)
              )
            ) {
              return "vendor";
            }
          },
        },
        external: [],
      },
      cssCodeSplit: false,
    },
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-10-06",
});
