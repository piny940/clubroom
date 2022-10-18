import { DropdownActionButton } from '../Common/DropdownActionButton'
import styles from '../../styles/navbar.module.scss'
import { AccountIcon } from '../Common/AccountIcon'
import { useUserInfo } from '../../contexts/UserInfoProvider'

export interface ProfileNavProps {
  logout: () => void
  accountSettingsFormID: string
  groupMenuID: string
}

export const ProfileNav: React.FC<ProfileNavProps> = ({
  logout,
  accountSettingsFormID,
  groupMenuID,
}) => {
  const { group } = useUserInfo()

  return (
    <div className="dropdown navbar-item">
      <a
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="mx-2"
      >
        <AccountIcon size={28} theme="dark" />
      </a>
      <ul className="dropdown-menu m-0" id={styles.profile_dropdown}>
        <DropdownActionButton
          bsTarget={'#' + accountSettingsFormID}
          bsToggle="modal"
          label="アカウント設定"
        />
        {group && (
          <DropdownActionButton
            bsTarget={'#' + groupMenuID}
            bsToggle="modal"
            label="グループ設定"
          />
        )}
        <DropdownActionButton handler={logout} label="ログアウト" />
      </ul>
    </div>
  )
}
