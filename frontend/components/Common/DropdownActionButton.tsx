import Link from 'next/link'
import { MouseEventHandler } from 'react'

export interface DropdownActionButtonProps {
  label: string
  handler?: MouseEventHandler
  bsToggle?: string
  bsTarget?: string
  href?: string
  testID?: string
}

export const DropdownActionButton: React.FC<DropdownActionButtonProps> = ({
  label,
  handler = () => undefined,
  bsToggle,
  bsTarget,
  href,
  testID,
}) => {
  const aProps = {
    role: 'button',
    className: 'dropdown-item',
    onClick: handler,
    'data-testid': testID,
    'data-bs-toggle': bsToggle,
    'data-bs-target': bsTarget,
  }

  return (
    <li>
      {href ? (
        <Link href={href}>
          <a {...aProps}>{label}</a>
        </Link>
      ) : (
        <a {...aProps}>{label}</a>
      )}
    </li>
  )
}
