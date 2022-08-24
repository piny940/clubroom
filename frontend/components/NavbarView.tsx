import { Group } from '../types'

export interface NavbarViewProps {
  title?: string
  groups: Group[]
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  title = 'Clubroom',
  groups,
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
              <li className="dropdown-item" key={group.id}>
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
