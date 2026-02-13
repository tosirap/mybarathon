export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      title: "MyBarathon - Événement Barathon et Bière pong à Strasbourg",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Participez à tous les évènements de MyBarathon. Des barathons, des bières pong et plein d'autre évènements.",
        },
        {
          name: "keywords",
          content:
            "barathon, Strasbourg, bars, événement, bière, bière-pong, soirée",
        },
        { name: "author", content: "MyBarathon Team" },
        { property: "og:title", content: "MyBarathon - Barathon 2025" },
        {
          property: "og:description",
          content:
            "Découvrez les bars participants au Barathon de Strasbourg le 9 octobre 2025.",
        },
        { property: "og:image", content: "public/favicon.ico" },
        { property: "og:url", content: "https://www.mybarathon.fr" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "",
        },
        { rel: "preconnect", href: "fonts.gstatic.com", crossorigin: "" },
        {
          rel: "preload",
          as: "font",
          href: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2",
          type: "font/woff2",
          crossorigin: "",
        },
        {
          rel: "preload",
          as: "style",
          href: "/_nuxt/assets/css/main.css",
          onload: "this.onload=null;this.rel='stylesheet'",
        },
        { rel: "dns-prefetch", href: "cdnjs.cloudflare.com" },
      ],
      style: [
        {
          innerHTML: `
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
            }
            body { font-family: 'Lato', sans-serif; }
            .container { max-width: 1200px; margin: 0 auto; }
            .mb-4 { margin-bottom: 1rem; }
            .text-center { text-align: center; }
          `,
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
    [
      "@nuxtjs/sitemap",
      {
        hostname: "https://www.mybarathon.fr",
        gzip: true,
        routes: async () => [
          "/",
          "/evenements",
          "/partenaires",
          "/billetterie",
          "/faq",
          "/securite",
          "/rejoindre",
          "/contact",
        ],
      },
    ],
    "@nuxtjs/supabase",
  ],

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
          manualChunks: {
            vendor: ["vue", "vue-router", "@nuxt/kit"],
            lucide: ["lucide-vue-next"],
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
