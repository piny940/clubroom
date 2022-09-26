import { toClass } from '../../utils/helpers'
import styles from '../../styles/group-menu.module.scss'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

export interface PageListButtonProps {
  open: Boolean
  testID?: string
  title: string
  link: string
  onClick?: MouseEventHandler
}

export const PageListButton: React.FC<PageListButtonProps> = ({
  open,
  testID,
  title,
  link,
  onClick = () => undefined,
}) => {
  return (
    <li className={toClass(open ? styles.open : '', styles.page_list_button)}>
      <Link href={'/group_menu/' + link}>
        <a
          role="button"
          className="h-100 d-block pt-2 px-4"
          onClick={onClick}
          data-testid={testID}
        >
          <h5>{title}</h5>
        </a>
      </Link>
    </li>
  )
}
