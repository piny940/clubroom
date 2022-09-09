import Link from 'next/link'
import { LoginRequired } from '../../containers/LoginRequired'
import { Group } from '../../types'
import { GroupsNav } from './GroupsNav'
import { ProfileNav } from './ProfileNav'

export interface NavbarViewProps {
  group?: string
  groups: Group[]
  setGroup: (group: Group) => void
  logout: () => void
  newGroupFormID: string
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  group,
  groups,
  setGroup,
  logout,
  newGroupFormID,
}) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Clubroom</a>
        </Link>
        <LoginRequired>
          <div className="d-flex justify-content-end align-items-center w-100">
            <GroupsNav
              groupName={group}
              groups={groups}
              setGroup={setGroup}
              newGroupFormID={newGroupFormID}
            />
            <ProfileNav logout={logout} />
          </div>
        </LoginRequired>
      </div>
    </nav>
  )
}
