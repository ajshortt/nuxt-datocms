<template>
  <div>
    {{ page }}
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
    const { page } = await $cms.records.fetchRaw(rawQuery,
      {
        pageId: 95637160,
        locale: 'en'
      }
    )
    return {
      page
    }
  },
}
</script>

