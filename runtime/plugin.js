import buildCmsClient from '~nuxtDatoCms/nuxt-datocms.js'

const config = <%= JSON.stringify(options, null, 2) %>

export default function ({ store }, inject) {
  const defaultOptions = {
    datoApiUrl: 'https://graphql.datocms.com',
    enableRealtime: false,
    enableTranslations: false,
    defaultLocale: 'en',
    l10nModule: 'i18n',
    l10nProperty: 'locale',
  }

  const moduleOptions = {
    ...defaultOptions,
    ...config.options
  }

  if (!moduleOptions.datoToken) { throw new Error('[nuxt-datocms] property datoToken is required') }

  const locale = store.state[moduleOptions.l10nModule] && store.state[moduleOptions.l10nModule][moduleOptions.l10nProperty]
    ? store.state[moduleOptions.l10nModule][moduleOptions.l10nProperty]
    : moduleOptions.defaultLocale

  inject('cms', buildCmsClient({
    apiUrl: moduleOptions.datoApiUrl,
    apiToken: moduleOptions.datoToken,
    enableRealtime: moduleOptions.datoEnableRealtime,
    enableTranslations: moduleOptions.enableTranslations
  }, locale))
}
