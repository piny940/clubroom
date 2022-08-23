import { serialize } from 'object-to-formdata'
import { GetTokenResult } from './apiResults'

const getToken = async (): Promise<GetTokenResult> => {
  const url = `/api/csrf`
  const response = await fetch(url, {
    credentials: 'include',
  })

  return await response.json()
}

export const fetchApi = async (params: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
}) => {
  const csrfData = await getToken()

  const response = await fetch(`/api/${params.url}`, {
    method: params.method,
    headers: {
      'X-CSRF-Token': csrfData.token,
    },
    body: params.method === 'GET' ? null : serialize(params.data),
    credentials: 'include',
  })
  return response
}

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
