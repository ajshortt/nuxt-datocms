export default `query ($pageId: ItemId, $locale: SiteLocale) {
  page (filter: {id: {eq: $pageId}}, locale: $locale) {
    id
    title
  }
}`
