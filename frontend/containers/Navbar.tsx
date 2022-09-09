import { NavbarView } from '../components/Navbar/NavbarView'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useGroupsState } from '../contexts/GroupsStateProvider'
import { useGroupState } from '../contexts/GroupStateProvider'
import { useUserState } from '../contexts/UserStateProvider'
import { logout } from '../utils/api'
import { AlertState } from '../utils/enums'
import { NewGroupForm } from './NewGroupForm'

export const Navbar: React.FC = () => {
  const newGroupFormID = 'new-group-form'
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
    <>
      <NavbarView
        groups={groups}
        group={group?.name}
        setGroup={setGroup}
        logout={handleLogout}
        newGroupFormID={newGroupFormID}
      />
      <NewGroupForm targetID={newGroupFormID} />
    </>
  )
}
