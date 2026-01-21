import { resolve } from 'path'

export default defineNuxtConfig({
  srcDir: 'app',

  runtimeConfig: {
    public: {
      mercadopagoPublicKey: process.env.MERCADOPAGO_PUBLIC_KEY || '',
    },
  },

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
