import { GraphQLClient } from 'graphql-request'
import { subscribeToQuery } from 'datocms-listen'
import { buildQuery } from './helpers'

const buildCmsClient = ({ apiUrl, apiToken, enableRealtime, enableTranslations, queries }, locale) => {
  const client = new GraphQLClient(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  })

  const makeFetch = async (query, variables = {}) => {
    try {
      return await client.request(query, variables)
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    records: {
      fetch: async (queries) => {
        const { query, variables } = buildQuery(queries, { enableTranslations, locale })
        const fetchData = await makeFetch(query, variables)
        return {
          data: fetchData,
          cmsReq: {
            query,
            variables,
          },
        }
      },
      fetchRaw: async (query, variables = {}) => {
        return await makeFetch(query, variables)
      }
    },
    page: {
      fetch: async (modelType, variables) => {
        if (!queries) throw new Error('Queries not defined')

        const modelQuery = queries[modelType]

        const combinedVariables = {
          ...variables,
          locale
        }

        if (!modelQuery) throw new Error('CMS query not found')

        const fetchData = await makeFetch(modelQuery, combinedVariables)

        return {
          data: fetchData,
          cmsReq: {
            query: modelQuery,
            variables: combinedVariables,
          },
        }
      }
    },
    listen: async ({ query, variables }, updateCallback) => {
      if (!enableRealtime) {
        console.warn('DatoCMS Error: Real-time update isn\'t enabled on this environment')
        return
      }

      try {
        return await subscribeToQuery({
          query,
          variables,
          token: apiToken,
          preview: true,
          onUpdate: (updatedResponse) => {
            const { response: { data } } = updatedResponse
            if (!data) return
            updateCallback(data)
          },
          onStatusChange: (status) => {
            console.log(`CMS Listener status: ${status}`)
          },
          onChannelError: (error) => {
            throw new Error(`DatoCMS Error: Listener: ${error}`)
          },
        })
      } catch (error) {
        throw new Error(error)
      }
    },
  }
}

export default buildCmsClient
