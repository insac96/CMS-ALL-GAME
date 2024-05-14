// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  srcDir: './src/client',

  serverDir: './src/server',

  nitro: {
    output: { 
      dir: './dist/server',
      serverDir: './dist/server/core', 
      publicDir: './dist/server/public' 
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    ['@nuxtjs/google-fonts', {
      display: 'swap',
      download: true,
      families: {
        Montserrat: [400,500,600,700]
      }
    }],
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    dev: process.env.NODE_ENV === 'production' ? false : true,
    mongoURI: process.env.MONGO_URI,
    mongoDB: process.env.MONGO_DB,
    
    public: {
      dev: process.env.NODE_ENV === 'production' ? false : true,
      cookieConfig: {
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    }
  },

  colorMode: {
    preference: 'dark'
  },
})
