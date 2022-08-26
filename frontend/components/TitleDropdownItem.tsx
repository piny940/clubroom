import { MouseEventHandler } from 'react'
import { TestID } from '../resources/TestID'
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
    <li
      className="dropdown-item"
      onClick={_onClick}
      data-testid={TestID.TITLE_DROPDOWN_ITEM}
    >
      {group.name}
    </li>
  )
}
