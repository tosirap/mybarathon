<template>
  <div>
    <a href="#contenu" class="skip-link">Aller au contenu</a>
    <Menu />

    <main id="contenu">
      <Accueil />
      <Evenements />
      <Partenaires />
      <Billetterie />
      <Faq />
      <Securite />
      <Rejoindre />
      <Contact />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import Menu from "~/components/common/Menu.vue";
import SiteFooter from "~/components/common/Footer.vue";

// Import des composants de chaque section
import Accueil from "~/components/Accueil.vue";
import Evenements from "~/components/Evenements.vue";
import Partenaires from "~/components/Partenaires.vue";
import Billetterie from "~/components/Billetterie.vue";
import Securite from "~/components/Securite.vue";
import Rejoindre from "~/components/Rejoindre.vue";
import Faq from "~/components/Faq.vue";
import Contact from "~/components/Contact.vue";

const siteUrl = "https://www.mybarathon.fr";

useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: "MyBarathon",
            url: `${siteUrl}/`,
            logo: `${siteUrl}/images/logo.png`,
            email: "mybarathon@gmail.com",
            sameAs: ["https://www.instagram.com/mybarathon/"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Strasbourg",
              addressCountry: "FR",
            },
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: "MyBarathon",
            inLanguage: "fr-FR",
            publisher: { "@id": `${siteUrl}/#organization` },
          },
        ],
      }),
    },
  ],
});
</script>
