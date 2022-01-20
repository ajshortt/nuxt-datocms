# Nuxt DatoCMS Plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> NuxtJS plugin that creates a clean and elegant way to fetch data from DatoCMS.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-datocms` dependency to your project

~~Add install dependency via Yarn/NPM~~ COMING SOON

```bash
# Navigate to modules directory of Nuxt project
cd modules

# If modules doesn't exist, create it
mkdir modules && cd modules

# Clone this repo to modules directory
git clone https://github.com/ajshortt/nuxt-datocms.git
```

2. Add `nuxt-datocms` to the `modules` section of `nuxt.config.js`

```js
/// nuxt.config.js
{
  modules: [
    // Simple usage
    ['nuxt-datocms', {
      options: {
        datoToken: 'xyz' // Add Dato API token
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
  nuxtDatoCms: {
    options: {
      datoToken: 'xyz' // Add Dato API token
    }
  }
}
```

3. Test fetching data from DatoCMS

```js
await this.$cms.raw(`query {
  _site {
    locales
  }
}`);
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
[npm-version-src]: https://img.shields.io/npm/v/nuxt-adyen-module/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-adyen-module
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-adyen-module.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-adyen-module
[license-src]: https://img.shields.io/npm/l/nuxt-adyen-module.svg
[license-href]: https://npmjs.com/package/nuxt-adyen-module
