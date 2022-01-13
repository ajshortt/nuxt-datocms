# Setup

## Simple installation

For basic setup, follow the initial setup found in the plugin [README](https://github.com/ajshortt/nuxt-datocms#setup).

## Configurations
You can the following config options to the plugin via the `options` object in `nuxt.config.js` e.g

```javascript
// nuxt.config.js
export default {
  modules: [
    ['~/modules/nuxt-datocms/module.js', {
      options: {
        // Add options here
      }
    }],
  ],
}
```

or in it's own attribute object in the nuxt config
```javascript
// nuxt.config.js
export default {
  modules: ['~/modules/nuxt-datocms/module.js'],

  nuxtDatoCms: {
    options: {
      // Add options here
    },
  }
}
```

## Options

| Option      | Description | Type        | Required    | Default       | Notes       |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| `datoToken` | Auth token provided by DatoCMS | string | ✅ | | |
| `datoApiUrl` | The URL of Dato that you want to make requests to | string | ❌ | `https://graphql.datocms.com` | |
| `datoEnableRealtime` | If true, enables real-time updates on save | boolean | ❌ | `false` | Please refer to usage to fully enable real-time updates |
| `enableTranslations` | If true, enables translation based queries to Dato | boolean | ❌ | `false` | It is recommended that l10n configurations are also set when translations are enabled |
| `defaultLocale` | The default locale key used when translations are enabled | string | ❌ | `en` | |
| `l10nModule` | The store module that holds the current locale property value | string | ❌ | `i18n` | Please refer to the [translations doc](translations.md) when setting this option |
| `l10nProperty` | The property key of the store module that holds the current locale property value | string | ❌ | `locale` | Please refer to the [translations doc](translations.md) when setting this option |

---
---

| <- [Back](index.md) |  |  | [Usage](usage.md) -> |
| :--- | --- | --- | ---: |

---
