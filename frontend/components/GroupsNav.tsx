import { Group } from '../types'
import { DropdownActionButton } from './DropdownActionButton'
import styles from '../styles/navbar.module.scss'
import Link from 'next/link'

export interface GroupNavProps {
  groupName?: string
  groups: Group[]
  setGroup: (group: Group) => void
}

export const GroupsNav: React.FC<GroupNavProps> = ({
  groupName = 'グループを選ぶ',
  groups,
  setGroup,
}) => {
  return (
    <div className="dropdown navbar-item mx-2">
      <div
        className="text-white dropdown-toggle"
        data-bs-toggle="dropdown"
        role="button"
        aria-expanded="false"
        dropdown-target="#brand-items"
      >
        {groupName}
      </div>
      <div className="dropdown-menu m-0 container" id={styles.groups_dropdown}>
        <div className="row mt-1 mb-2">
          <Link href="/new-group">
            <a className="mx-auto w-auto" id={styles.new_group_link}>
              グループを新規作成
            </a>
          </Link>
        </div>
        <ul className="list-unstyled">
          {groups.map((group) => (
            <DropdownActionButton
              label={group.name}
              handler={() => setGroup(group)}
              key={group.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
