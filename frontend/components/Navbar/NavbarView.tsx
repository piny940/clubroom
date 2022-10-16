import Link from 'next/link'
import { LoginRequired } from '../../containers/LoginRequired'
import { Group } from '../../resources/types'
import { GroupsNav } from './GroupsNav'
import { ProfileNav } from './ProfileNav'

export interface NavbarViewProps {
  group?: Group
  groups: Group[]
  setGroup: (group: Group) => void
  logout: () => void
  newGroupFormID: string
  accountSettingsFormID: string
  groupMenuID: string
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  group,
  groups,
  setGroup,
  logout,
  newGroupFormID,
  accountSettingsFormID,
  groupMenuID,
}) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <Link href="/">
          <a className="navbar-brand">Clubroom</a>
        </Link>
        <LoginRequired whenNoUser={<></>}>
          <div className="d-flex justify-content-end align-items-center w-100">
            <GroupsNav
              groupName={group?.name}
              groups={groups}
              setGroup={setGroup}
              newGroupFormID={newGroupFormID}
            />
            <ProfileNav
              logout={logout}
              accountSettingsFormID={accountSettingsFormID}
              groupMenuID={groupMenuID}
            />
          </div>
        </LoginRequired>
      </div>
    </nav>
  )
}
