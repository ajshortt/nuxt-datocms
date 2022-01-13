const buildQueryArgs = (args, { translationsEnabled, locale }) => {
  if (args && !translationsEnabled) return `(${args})`

  return args
    ? `(locale: ${locale}, ${args})`
    : `(locale: ${locale})`
}

export const buildGraphQLString = (queries, config) => {
  const queryString = queries.reduce((accumulatedQueryString, {
    type,
    args,
    query,
  }) => {
    const queryArgs = buildQueryArgs(args, config)
    return `${accumulatedQueryString} ${type}${queryArgs} ${query}`
  }, '')

  return `query { ${queryString} }`
}
