import { Group } from '../types'
import { DropdownActionButton } from './DropdownActionButton'

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
      <ul className="dropdown-menu m-0">
        {groups.map((group) => (
          <DropdownActionButton
            label={group.name}
            handler={() => setGroup(group)}
            key={group.id}
          />
        ))}
      </ul>
    </div>
  )
}
