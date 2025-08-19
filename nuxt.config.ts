import { SpeedInsights } from '@vercel/speed-insights/nuxt'

export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',   // ✅ TailwindCSS intégré
  ],
  buildModules: [
    '@nuxtjs/sitemap', // Include the sitemap module in buildModules,
    SpeedInsights // '@vercel/speed-insights/nuxt' 
  ],
  sitemap: {
    hostname: 'https://www.mybarathon.fr', // Replace with your domain
    gzip: true, // Enable gzip compression for the generated sitemap
    routes: [
    ],
  },
  css: [
    '~/assets/css/main.css'  // ✅ fichier Tailwind (si tu as créé assets/css/main.css avec @tailwind base, components, utilities)
  ]
})