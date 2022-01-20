---
title: Setup
description: ''
position: 2
category: Getting started
---

<alert type="info">

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

</alert>

Add `@ajshortt/nuxt-datocms` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @ajshortt/nuxt-datocms
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @ajshortt/nuxt-datocms
  ```

  </code-block>
</code-group>

Then, add `@ajshortt/nuxt-datocms` to the `modules` section in your `nuxt.config.js`. You can use either of the following ways to specify the module options:

```js {}[nuxt.config.js]
{
  modules: [
    '@ajshortt/nuxt-datocms',
  ],
  nuxtDatoCms: {
    /* module options */
  },
}
```

or

```js {}[nuxt.config.js]
{
  modules: [
    [
      '@ajshortt/nuxt-datocms',
      { /* module options */ }
    ]
  ],
}
```

