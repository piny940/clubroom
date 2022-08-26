import { MouseEventHandler } from 'react'
import { TestID } from '../resources/TestID'

export interface DropdownActionButtonProps {
  label: string
  handler: MouseEventHandler
}

export const DropdownActionButton: React.FC<DropdownActionButtonProps> = ({
  label,
  handler,
}) => {
  return (
    <li>
      <a
        className="dropdown-item"
        onClick={handler}
        data-testid={TestID.DROPDOWN_ACTION_BUTTON}
      >
        {label}
      </a>
    </li>
  )
}
