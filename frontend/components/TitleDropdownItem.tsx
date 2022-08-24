import { MouseEventHandler } from 'react'
import { Group } from '../types'

export interface TitleDropdownItemProps {
  group: Group
  setGroup: (group: Group) => void
}

export const TitleDropdownItem: React.FC<TitleDropdownItemProps> = ({
  group,
  setGroup,
}) => {
  const _onClick: MouseEventHandler = (e) => {
    setGroup(group)
  }

  return (
    <li className="dropdown-item" onClick={_onClick}>
      {group.name}
    </li>
  )
}
