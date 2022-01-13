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
const graphQlString = `{
  id
  title
}`

export default {
  name: 'SomePage',

  async asyncData({ $cms }) {
    const response = await $cms.fetch([{
      type: 'page',
      query: graphQlString,
    }])

    return response.data
  },
}
```

The above would equate to making the following GraphQL request to Dato

```javascript
`query {
  page {
    id
    title
  }
}
```

It is recommended that you destructor your responses too for code hygiene.

```javascript
//...
export default {
  // ...
  async asyncData({ $cms }) {
    const { data: page } = await $cms.fetch([{
      type: 'page',
      query: graphQlString,
    }])

    return {
      page
    }
  },
}
```

## Multiple query fetch

When fetching data from DatoCMS, it is good practice to keep the amount of requests as low as possible.
With the power of Dato's usage of GraphQL, we can do just that...

```javascript
// pages/SomePage.vue
const somePageQuery = `{
  id
  title
}`

const someSettingQuery = `{
  settingName
  settingValue
}`

export default {
  name: 'SomePage',

  async asyncData({ $cms }) {
    const { data: page, settings } = await $cms.fetch([
      {
        type: 'page',
        query: somePageQuery,
      },
      {
        type: 'settings',
        query: someSettingQuery,
      },
    ])

    return {
      page,
      settings
    }
  },
}
```

Notice we pass queries via an array of query objects.

### Adding arguments

```javascript
const someQuery = `{
  settingName
  settingValue
}`

const { data: settings } = await $cms.fetch([{
  type: 'settings',
  args: 'first: 10',
  query: someQuery
}])
```

This would result in a query like this...
```javascript
`query {
  settings(first: 10) {
    settingName
    settingValue
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

