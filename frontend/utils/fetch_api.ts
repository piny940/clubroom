import { serialize } from 'object-to-formdata'

interface CsrfData {
  token: string
  status: string
}

const getToken = async (): Promise<CsrfData> => {
  const url = "api/csrf"
  const response = await fetch(url, {
    credentials: "include"
  })

  return response.json()
}

const fetchApi = async (params: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
}) => {
  const csrfData = await getToken()
  console.log(JSON.stringify(params.data))

  const response = await fetch(`api/${params.url}`, {
    method: params.method,
    headers: {
      "X-CSRF-Token": csrfData.token
    },
    body: params.method === 'GET' ? null : serialize(params.data),
    credentials: "include",
  })
  return response
}

export default fetchApi
