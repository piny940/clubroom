import { serialize } from 'object-to-formdata'
import { LogoutReturn } from '../resources/apiRetuns'
import { Group, Talk, Talkroom, User } from '../types'

const getToken = async (): Promise<string> => {
  const url = `/api/csrf`
  const response = await fetch(url, {
    credentials: 'include',
  })
  const json = await response.json()

  return json.data.token
}

export const fetchApi = async (params: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: any
}) => {
  const response = await fetch(`/api${params.url}`, {
    method: params.method,
    headers: {
      'X-CSRF-Token': await getToken(),
    },
    body: params.method === 'GET' ? null : serialize(params.data),
    credentials: 'include',
  })
  return response
}

export const postData = async (params: {
  url: string
  data: object
  scope?: string
  onSuccess: (json: any) => void
  onFail: (json: any) => void
}) => {
  const response = await fetchApi({
    url: params.url,
    method: 'POST',
    data: params.scope ? { [params.scope]: params.data } : params.data,
  })
  const json = await response.json()

  if (response.status >= 400) {
    params.onFail(json)
  } else {
    params.onSuccess(json)
  }
}

export const fetchUser = async (): Promise<User | undefined> => {
  const response = await fetchApi({
    url: '/user',
    method: 'GET',
  })
  const json = await response.json()
  return json.data.user
}

export const fetchGroups = async (): Promise<Group[]> => {
  if (!(await fetchUser())) return []
  const response = await fetchApi({
    url: '/member/groups',
    method: 'GET',
  })
  const json = await response.json()
  return json.data.groups
}

export const fetchTalkrooms = async (groupID: number): Promise<Talkroom[]> => {
  const response = await fetchApi({
    url: `/member/groups/${groupID}/talkrooms`,
    method: 'GET',
  })
  const json = await response.json()
  return json.data.talkrooms
}

export const fetchTalks = async (talkroom: Talkroom): Promise<Talk[]> => {
  const response = await fetchApi({
    url: `/member/groups/${talkroom.group_id}/talkrooms/${talkroom.id}/talks`,
    method: 'GET',
  })
  const json = await response.json()
  return json.data.talks
}

export const logout = async (): Promise<{
  message: string
  data: LogoutReturn
}> => {
  const response = await fetchApi({
    url: '/session',
    method: 'DELETE',
  })
  const json = await response.json()

  return json
}
