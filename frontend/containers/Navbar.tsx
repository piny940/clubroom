import { useEffect, useState } from 'react'
import { NavbarView } from '../components/NavbarView'
import { useGroupState } from '../contexts/GroupStateProvider'
import { Group } from '../types'
import { fetchGroups } from '../utils/api'

export const Navbar: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  const { group, setGroup } = useGroupState()

  const _updateGroups = async () => {
    setGroups(await fetchGroups())
  }

  useEffect(() => {
    void _updateGroups()
  }, [])

  return <NavbarView groups={groups} group={group?.name} setGroup={setGroup} />
}
