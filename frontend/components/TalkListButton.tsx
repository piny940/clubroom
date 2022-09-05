import { MouseEventHandler } from 'react'
import { TestID } from '../resources/TestID'
import styles from '../styles/talk-app.module.scss'
import { toClass } from '../utils/helpers'

export interface TalkListButtonProps {
  handler: MouseEventHandler
  detail?: string
  title: string
  open: boolean
}

export const TalkListButton: React.FC<TalkListButtonProps> = ({
  handler,
  detail,
  title,
  open,
}) => {
  return (
    <li className={styles.talk_list_button}>
      <a
        role="button"
        className={toClass(
          'w-100 h-100 d-block pt-2 pe-1 ps-4',
          open ? styles.open : ''
        )}
        onClick={handler}
        data-testid={TestID.TALK_LIST_BUTTON}
      >
        <h5>{title}</h5>
        {detail ? (
          <div className="detail small text-secondary ms-3">{detail}</div>
        ) : (
          <></>
        )}
      </a>
    </li>
  )
}
