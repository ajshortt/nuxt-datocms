import axios from 'axios'
import { subscribeToQuery } from 'datocms-listen'
import { buildGraphQLString } from '~nuxtDatoCms/helpers'

const buildCmsClient = ({ apiUrl, apiToken, enableRealtime, enableTranslations }, locale) => {
  const http = axios.create({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  })

  const makeFetch = async (query) => {
    try {
      const { data: { errors, data } } = await http.post(apiUrl, {
        query,
      })

      if (errors && errors.length > 0) {
        const errorsString = JSON.stringify(errors)
        throw new Error(`DatoCMS Error: ${errorsString}`)
      }

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    fetch: async (queries) => {
      const graphQL = buildGraphQLString(queries, { enableTranslations, locale })
      const fetchData = await makeFetch(graphQL)
      return {
        query: graphQL,
        data: fetchData,
      }
    },
    raw: async (query) => {
      return await makeFetch(query)
    },
    listen: async (query, updateCallback) => {
      if (!enableRealtime) {
        console.warn('DatoCMS Error: Real-time update isn\'t enabled on this environment')
        return
      }

      try {
        return await subscribeToQuery({
          query,
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
