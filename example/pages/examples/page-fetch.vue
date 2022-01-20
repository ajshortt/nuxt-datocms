<template>
  <div>
    {{ page }}
  </div>
</template>

<script>
export default {
  name: 'PageFetchExample',

  async asyncData({ $cms }) {
    const { data: { page } } = await $cms.page.fetch('page', {
      pageId: 95637160
    })
    return {
      page
    }
  },
}
</script>

