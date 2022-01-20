<template>
  <div>
    {{ page }}
  </div>
</template>

<script>
const pageQuery = `page (filter: {id: {eq: $pageId}}, locale: $locale) {
  id
  title
}`

export default {
  name: 'ExamplePage',

  async asyncData({ $cms }) {
    const { data: { page } } = await $cms.records.fetch([{
      query: pageQuery,
      args: [
        {
          key: 'pageId',
          type: 'ItemId!',
          value: 95637160,
        },
      ],
    }])
    return {
      page
    }
  },
}
</script>

