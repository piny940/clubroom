import Link from 'next/link'
import { Group } from '../types'
import { TitleDropdownItem } from './TitleDropdownItem'

export interface NavbarViewProps {
  group?: string
  groups: Group[]
  setGroup: (group: Group) => void
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  group = 'グループを選ぶ',
  groups,
  setGroup,
}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Clubroom</a>
        </Link>
        <div className="d-flex justify-content-end w-100">
          <div className="dropdown navbar-item">
            <div
              className="text-white dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              dropdown-target="#brand-items"
            >
              {group}
            </div>
            <ul className="dropdown-menu m-0">
              {groups.map((group) => (
                <TitleDropdownItem
                  group={group}
                  setGroup={setGroup}
                  key={group.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
