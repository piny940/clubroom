import { NavbarView } from '../components/Navbar/NavbarView'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { logout } from '../utils/api'
import { AlertState } from '../resources/enums'
import { NewGroupForm } from './NewGroupForm'
import { AccountSettingsForm } from './AccountSettingForm'

export const Navbar: React.FC = () => {
  const newGroupFormID = 'new-group-form'
  const accountSettingsFormID = 'account-settings-form'

  const { groups, group, updateUser, setGroup } = useUserInfo()
  const { setAlerts } = useAlerts()

  const handleLogout = async () => {
    if (!window.confirm('ログアウトしますか。')) return
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
        group={group}
        setGroup={setGroup}
        logout={handleLogout}
        newGroupFormID={newGroupFormID}
        accountSettingsFormID={accountSettingsFormID}
      />
      <NewGroupForm targetID={newGroupFormID} />
      <AccountSettingsForm targetID={accountSettingsFormID} />
    </>
  )
}
