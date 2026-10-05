<script setup lang="ts">
import { MailIcon, MapPinIcon, GlobeIcon } from "lucide-vue-next";
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="section-y bg-white">
    <div class="container-page">
      <div class="max-w-3xl">
        <p class="eyebrow">
          <MailIcon class="h-4 w-4" aria-hidden="true" />
          Nous joindre
        </p>
        <h2 id="contact-title" class="section-title">Contact</h2>
        <p class="section-lead">
          Une question ? Une idée ? Un partenariat ? L’équipe de MyBarathon est à
          votre écoute !
        </p>
      </div>

      <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <li class="card">
          <span class="icon-chip">
            <MapPinIcon class="h-5 w-5" aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-semibold text-ink/60">Où</p>
          <p class="font-bold">Basés à Strasbourg</p>
        </li>

        <li class="card">
          <span class="icon-chip">
            <MailIcon class="h-5 w-5" aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-semibold text-ink/60">Email</p>
          <a href="mailto:mybarathon@gmail.com" class="link break-all">
            mybarathon@gmail.com
          </a>
        </li>

        <li class="card">
          <span class="icon-chip">
            <GlobeIcon class="h-5 w-5" aria-hidden="true" />
          </span>
          <p class="mt-4 text-sm font-semibold text-ink/60">Site</p>
          <a href="https://www.mybarathon.fr" class="link">mybarathon.fr</a>
        </li>

        <li class="card">
          <span class="icon-chip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5-1.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </span>
          <p class="mt-4 text-sm font-semibold text-ink/60">Instagram</p>
          <a
            href="https://www.instagram.com/mybarathon/"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            Mybarathon
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
