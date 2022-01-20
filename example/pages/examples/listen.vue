<template>
  <div>
    {{ page }}
    <hr>
    {{ cmsReq }}
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
    const { data: { page }, cmsReq } = await $cms.records.fetch([{
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
      page,
      cmsReq,
    }
  },

  mounted() {
    this.$cms.listen(this.cmsReq, ({ page }) => {
      this.page = page
    })
  },
}
</script>

