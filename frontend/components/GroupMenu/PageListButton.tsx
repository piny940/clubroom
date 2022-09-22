import { toClass } from '../../utils/helpers'
import styles from '../../styles/group-menu.module.scss'
import Link from 'next/link'

export interface PageListButtonProps {
  open: Boolean
  testID?: string
  title: string
  link: string
}

export const PageListButton: React.FC<PageListButtonProps> = ({
  open,
  testID,
  title,
  link,
}) => {
  return (
    <li
      className={toClass(
        'position-relative',
        open ? styles.open : '',
        styles.page_list_button
      )}
    >
      <Link href={link}>
        <a
          role="button"
          className="h-100 d-block pt-2 px-4"
          onClick={() => undefined}
          data-testid={testID}
        >
          <h5>{title}</h5>
        </a>
      </Link>
    </li>
  )
}
