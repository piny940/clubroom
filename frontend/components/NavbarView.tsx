export interface NavbarViewProps {
  title?: string
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  title = 'Clubroom',
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
            <li className="dropdown-item">a</li>
            <li className="dropdown-item">b</li>
            <li className="dropdown-item">c</li>
            <li className="dropdown-item">d</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
