import { DropdownActionButton } from './DropdownActionButton'

export interface ProfileNavProps {
  logout: () => void
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ logout }) => {
  return (
    <div className="dropdown navbar-item">
      <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="material-icons text-white mx-2 fs-2">
          account_circle
        </span>
      </a>
      <ul className="dropdown-menu m-0">
        <DropdownActionButton handler={logout} label="ログアウト" />
      </ul>
    </div>
  )
}
