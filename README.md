# Nuxt DatoCMS Plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> NuxtJS plugin that creates a clean and elegant way to fetch data from DatoCMS.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@ajshortt/nuxt-datocms` dependency to your project

```bash
yarn add @ajshortt/nuxt-datocms # or npm install @ajshortt/nuxt-datocms
```

2. Add `nuxt-datocms` to the `modules` section of `nuxt.config.js`

```js
/// nuxt.config.js
{
  modules: [
    // Simple usage
    ['nuxt-datocms', {
      options: {
        datoToken: <DATO-API-TOKEN> // Add Dato API token
      }
    }]
  ]
}
```

Or a separate section `nuxt-datocms` for module options:

```js
// nuxt.config.js
{
  modules: [
    // Simple usage
    'nuxt-datocms',
  ],
  'nuxt-datocms': {
    options: {
      datoToken: <DATO-API-TOKEN> // Add Dato API token
    }
  }
}
```

3. Test fetching data from DatoCMS within a page's `asyncData` lifecycle method.

```js
async asyncData({ $cms }) {
  const data = await $cms.records.fetchRaw(`query {
    _site {
      locales
    }
  }`)
  console.log(data)
}
```
## Documentation

For all configuration, further setup and usage information, please do the following

Move to the `docs` directory:

```bash
cd docs
```

Install dependencies and start the project in development mode:

```bash
yarn && yarn dev
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alex Shortt <hello@alex-shortt.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@ajshortt/nuxt-datocms/latest.svg
[npm-version-href]: https://npmjs.com/package/@ajshortt/nuxt-datocms
[npm-downloads-src]: https://img.shields.io/npm/dt/@ajshortt/nuxt-datocms.svg
[npm-downloads-href]: https://npmjs.com/package/@ajshortt/nuxt-datocms
[license-src]: https://img.shields.io/npm/l/@ajshortt/nuxt-datocms.svg
[license-href]: https://github.com/ajshortt/nuxt-datocms/blob/main/LICENSE
