import { NavbarView } from '../components/NavbarView'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useGroupsState } from '../contexts/GroupsStateProvider'
import { useGroupState } from '../contexts/GroupStateProvider'
import { useUserState } from '../contexts/UserStateProvider'
import { logout } from '../utils/api'
import { AlertState } from '../utils/enums'

export const Navbar: React.FC = () => {
  const { groups } = useGroupsState()

  const { group, setGroup } = useGroupState()
  const { updateUser } = useUserState()
  const { setAlerts } = useAlertsState()

  const handleLogout = async () => {
    const json = await logout()
    setAlerts({
      content: json.message,
      state: AlertState.NOTICE,
    })
    updateUser()
  }

  return (
    <NavbarView
      groups={groups}
      group={group?.name}
      setGroup={setGroup}
      logout={handleLogout}
    />
  )
}
