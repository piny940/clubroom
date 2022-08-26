import Link from 'next/link'
import { LoginRequired } from '../containers/LoginRequired'
import { Group } from '../types'
import { GroupsNav } from './GroupsNav'
import { ProfileNav } from './ProfileNav'

export interface NavbarViewProps {
  group?: string
  groups: Group[]
  setGroup: (group: Group) => void
  logout: () => void
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  group,
  groups,
  setGroup,
  logout,
}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Clubroom</a>
        </Link>
        <LoginRequired>
          <div className="d-flex justify-content-end align-items-center w-100">
            <GroupsNav groupName={group} groups={groups} setGroup={setGroup} />
            <ProfileNav logout={logout} />
          </div>
        </LoginRequired>
      </div>
    </nav>
  )
}
