import { NavbarView } from '../components/Navbar/NavbarView'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { logout } from '../utils/api'
import { AlertState } from '../utils/enums'
import { NewGroupForm } from './NewGroupForm'

export const Navbar: React.FC = () => {
  const newGroupFormID = 'new-group-form'
  const { groups, group, updateUser, setGroup } = useUserInfo()
  const { setAlerts } = useAlertsState()

  const handleLogout = async () => {
    const json = await logout()
    setAlerts({
      content: json.message,
      state: AlertState.NOTICE,
    })
    void updateUser()
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
