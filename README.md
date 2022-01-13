# Nuxt DatoCMS Plugin

NuxtJS plugin that creates a clean and elegant way to fetch data from DatoCMS.

## Contents

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
For all configuration, further setup and usage information, please read the [Plugin Docs](https://https://github.com/ajshortt/nuxt-datocms/docs/index.md).

## Development

1. Creat a fork of this repository and clone it into a local `modules` directory
2. Install dependencies using `yarn install` or `npm install`
3. Start development.
4. Create pull request from forked repo into the original repo
5. Raise a github issue with a description of your changes and a link to the PR

## License

[MIT License](./LICENSE)
