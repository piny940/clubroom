import { MouseEventHandler } from 'react'

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
      <a className="dropdown-item" onClick={handler}>
        {label}
      </a>
    </li>
  )
}
