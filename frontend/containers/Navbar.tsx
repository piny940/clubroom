import { useEffect, useState } from 'react'
import { NavbarView } from '../components/NavbarView'
import { Group } from '../types'
import { fetchApi } from '../utils/helpers'

export const Navbar: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  const _fetchUser = async () => {
    const response = await fetchApi({ url: '/user', method: 'GET' })
    const json = await response.json()
    return json.data.user
  }
  const _updateGroups = async () => {
    if (!(await _fetchUser())) return
    const response = await fetchApi({ url: '/member/groups', method: 'GET' })
    const data = await response.json()
    setGroups(data.groups)
  }

  useEffect(() => {
    void _updateGroups()
  }, [])

  return <NavbarView groups={groups} />
}
