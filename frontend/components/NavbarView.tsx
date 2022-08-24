import { Group } from '../types'
import { TitleDropdownItem } from './TitleDropdownItem'

export interface NavbarViewProps {
  title?: string
  groups: Group[]
  setGroup: (group: Group) => void
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  title = 'Clubroom',
  groups,
  setGroup,
}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <div className="dropdown navbar-brand">
          <div
            className="navbar-brand dropdown-toggle"
            data-bs-toggle="dropdown"
            role="button"
            aria-expanded="false"
            dropdown-target="#brand-items"
          >
            {title}
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
    </nav>
  )
}
