<template>
  <div>
    <!-- {{ page }} -->
  </div>
</template>

<script>
const rawQuery = `query ($pageId: ItemId, $locale: SiteLocale) {
  page (filter: {id: {eq: $pageId}}, locale: $locale) {
    id
    title
  }
}`

export default {
  name: 'RawFetchExample',

  async asyncData({ $cms }) {
    const data = await $cms.records.fetchRaw(`query {
      _site {
        locales
      }
    }`)
    console.log(data)
  },
}
</script>

