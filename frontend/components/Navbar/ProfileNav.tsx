import { DropdownActionButton } from '../Common/DropdownActionButton'
import styles from '../../styles/navbar.module.scss'
import { MaterialIcon } from '../Common/MaterialIcon'

export interface ProfileNavProps {
  logout: () => void
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ logout }) => {
  return (
    <div className="dropdown navbar-item">
      <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <MaterialIcon className="text-white mx-2 fs-2" name="account_circle" />
      </a>
      <ul className="dropdown-menu m-0" id={styles.profile_dropdown}>
        <DropdownActionButton handler={logout} label="ログアウト" />
      </ul>
    </div>
  )
}
