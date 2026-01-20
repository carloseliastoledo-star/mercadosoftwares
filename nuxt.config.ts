import { resolve } from 'path'

export default defineNuxtConfig({
  srcDir: 'app',

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  nitro: {
    publicAssets: [
      {
        baseURL: '/',
        dir: resolve(__dirname, 'app/public'),
      },
    ],
  },

  alias: {
    '#root': resolve(__dirname),
  },

  vite: {
    resolve: {
      alias: {
        '#root': resolve(__dirname),
      },
    },
  },
})
