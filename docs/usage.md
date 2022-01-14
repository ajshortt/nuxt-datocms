# Usage

The Nuxt DatoCMS plugin registers itself under the `cms` key. This means the plugin is available at `this.$cms` or just
`$cms` within the nuxt context.

## Contents
- [`fetch` method](#fetch-method)
  - [Single query fetch](#single-query-fetch)
  - [Multiple query fetch](#multiple-query-fetch)
  - [Adding arguments](#adding-arguments)
- [`listen` method](#listen-method)
- [`fetchRaw` method](#listen-method)

## `fetch` method
The fetch method is a simple and clean way to fetch data from Dato. It is flexible in it's nature,
being able to query anything from Dato whilst also having several useful configurations baked in
under-the-hood.

### Single query fetch
```javascript
// pages/SomePage.vue
const graphQlString = `homePage {
  id
  title
}`

export default {
  name: 'SomePage',

  async asyncData({ $cms }) {
    const response = await $cms.fetch([{
      query: graphQlString,
    }])

    return response.data.homePage
  },
}
```

The above would equate to making the following GraphQL request to Dato

```javascript
`query {
  homePage {
    id
    title
  }
}
```

It is recommended that you destructor your responses for code hygiene.

```javascript
//...
export default {
  // ...
  async asyncData({ $cms }) {
    const { data: homePage } = await $cms.fetch([{
      query: graphQlString,
    }])

    return {
      homePage
    }
  },
}
```

## Multiple query fetch

When fetching data from DatoCMS, it is good practice to keep the amount of requests as low as possible.
With the power of Dato's usage of GraphQL, we can do just that...

```javascript
// pages/SomePage.vue
const homePageQuery = `homePage {
  id
  title
}`

const globalThemeQuery = `globalTheme {
  themeName
  themeColour
}`

export default {
  name: 'SomePage',

  async asyncData({ $cms, store }) {
    const { data: page, globalTheme } = await $cms.fetch([
      {
        query: homePageQuery,
      },
      {
        query: globalThemeQuery,
      },
    ])

    store.dispatch('theme/setTheme', globalTheme)

    return {
      page,
    }
  },
}
```

Notice we pass queries via an array of query objects. The above example outlines how you might compound your different
types of data fetching into one request.

### Adding arguments

```javascript
const pagesQuery = `allPages (first: $first) {
  id
  title
}`

const { data: allPages } = await $cms.fetch([{
  query: pagesQuery
  args: [
    {
      key: 'first', // Creates the $first variable/argument
      type: 'IntType = 10', // Defines the type, and/or default value / required bang e.g IntType!
      value: 5, // The value used in the argument
    },
  ],
}])
```

This would result in a query like this...
```javascript
`query ($first: IntType = 10) {
  allPages (first: 5) {
    id
    title
  }
}`
```

## `listen` method
Coming soon

### Real-time updates using `fetch` + `listen`

It is common that you would like some data to update on-the-fly whilst saving in Dato.

```javascript
// pages/SomePage.vue
const pageQuery = `{
  id
  title
}`

export default {
  name: 'SomePage',

  async asyncData({ $cms }) {
    const { data: { page }, query } = await $cms.fetch([{
      type: 'page',
      query: pageQuery,
    }])
    return {
      page,
      query,
    }
  },

  mounted() {
    this.$cms.listen(this.query, ({ page }) => {
      this.page = page
    })
  },
}
```

Notice that `$cms.fetch` not only returns the data response but also the complete
query string used to make the request in the first place. This is so we can use
it with the `$cms.listen` method seen in the `mounted` lifecycle method.

The `$cms.listen` method subscribes to the parsed query and will return the updated
data upon save of record.

It's recommended that this be used on page data queries only as other data fetches
like site settings might have side-effects.

## `fetchRaw` method
Coming soon

---
---

| <- [Back](index.md) |  |  | [Translations](translations.md) -> |
| :--- | --- | --- | ---: |

---

