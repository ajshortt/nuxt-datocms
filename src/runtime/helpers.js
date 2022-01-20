const reduceArgsToString = (argsString, currentArg, index) => {
  return `${argsString}${index > 0 ? ', ' : ''}$${currentArg.key}: ${currentArg.type}`
}

const concatenateArgs = (allArgs, currentQueryArgs) => {
  if (!currentQueryArgs) return allArgs

  return `${allArgs}${allArgs.length ? ', ' : ''}${currentQueryArgs.reduce(reduceArgsToString, '')}`
}

const addBaseRequestArgs = ({ enableTranslations, locale }) => {
  return enableTranslations ? '$locale: SiteLocale!' : ''
}

const addBaseRequestVariables = ({ enableTranslations, locale }) => {
  if (!enableTranslations) return {}

  return {
    locale,
  }
}

const addArgToVariablesObject = (allVariables, currentArg) => {
  return {
    ...allVariables,
    [currentArg.key]: currentArg.value,
  }
}

const concatenateArgVariables = (variables, args) => {
  return {
    ...variables,
    ...args.reduce(addArgToVariablesObject, {}),
  }
}

export const buildQuery = (queries, config) => {
  const request = queries.reduce((fullRequest, {
    args,
    query,
  }) => {
    return {
      query: `${fullRequest.query} ${query}`,
      args: concatenateArgs(fullRequest.args, args),
      variables: concatenateArgVariables(fullRequest.variables, args),
    }
  }, {
    query: '',
    variables: addBaseRequestVariables(config),
    args: addBaseRequestArgs(config),
  })

  const fullQuery = `query (${request.args}) {
    ${request.query}
  }`

  return {
    query: fullQuery,
    variables: request.variables,
  }
}
