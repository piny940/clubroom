import { toClass } from '../../utils/helpers'
import styles from '../../styles/group-menu.module.scss'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { useRouter } from 'next/router'

export interface PageListButtonProps {
  testID?: string
  title: string
  link: string
  onClick?: MouseEventHandler
}

export const PageListButton: React.FC<PageListButtonProps> = ({
  testID,
  title,
  link,
  onClick = () => undefined,
}) => {
  const router = useRouter()
  const openPage = router.pathname.split('/').slice(2).join('/')

  return (
    <li
      className={toClass(
        openPage === link ? styles.open : '',
        styles.page_list_button
      )}
    >
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
