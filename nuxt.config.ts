export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://www.w3schools.com/w3css/4/w3.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
        { rel: 'icon', type: 'image/png', href: '_nuxt/assets/images/logo.png' }
      ]
    }
}})