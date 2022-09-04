import { useEffect, useState } from 'react'
import { NavbarView } from '../components/NavbarView'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useGroupState } from '../contexts/GroupStateProvider'
import { useUserState } from '../contexts/UserStateProvider'
import { Group } from '../types'
import { fetchGroups, logout } from '../utils/api'
import { AlertState } from '../utils/enums'

export const Navbar: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  const { group, setGroup } = useGroupState()
  const { user, updateUser } = useUserState()
  const { setAlerts } = useAlertsState()

  const _updateGroups = async () => {
    setGroups(await fetchGroups())
  }

  const handleLogout = async () => {
    const json = await logout()
    setAlerts({
      content: json.message,
      state: AlertState.NOTICE,
    })
    updateUser()
  }

  useEffect(() => {
    void _updateGroups()
  }, [user])

  return (
    <NavbarView
      groups={groups}
      group={group?.name}
      setGroup={setGroup}
      logout={handleLogout}
    />
  )
}
