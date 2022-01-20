import cmsQueries from './cms/queries'

export default {
  buildModules: ['@nuxt/typescript-build'],
  modules: ['../src/module.ts'],
  nuxtDatoCms: {
    options: {
      datoApiUrl: process.env.DATO_API_URL,
      datoToken: process.env.DATO_TOKEN,
      datoEnableRealtime: process.env.DATO_ENABLE_REALTIME === 'true',
      enableTranslations: true,
      defaultLocale: 'en',
      l10nModule: 'i18n',
      l10nProperty: 'locale',
      queries: cmsQueries
    },
  },
}
