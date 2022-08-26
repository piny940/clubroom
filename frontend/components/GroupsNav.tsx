import { Group } from '../types'
import { TitleDropdownItem } from './TitleDropdownItem'

export interface GroupNavProps {
  group?: string
  groups: Group[]
  setGroup: (group: Group) => void
}

export const GroupsNav: React.FC<GroupNavProps> = ({
  group = 'グループを選ぶ',
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
        {group}
      </div>
      <ul className="dropdown-menu m-0">
        {groups.map((group) => (
          <TitleDropdownItem group={group} setGroup={setGroup} key={group.id} />
        ))}
      </ul>
    </div>
  )
}
