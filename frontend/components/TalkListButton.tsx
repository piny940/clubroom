import { MouseEventHandler } from 'react'
import { TestID } from '../resources/TestID'
import styles from '../styles/talk-app.module.scss'

export interface TalkListButtonProps {
  handler: MouseEventHandler
  detail?: string
  title: string
}

export const TalkListButton: React.FC<TalkListButtonProps> = ({
  handler,
  detail,
  title,
}) => {
  return (
    <li className={styles.talk_list_button}>
      <a
        role="button"
        className="w-100 h-100 d-block pt-2 ps-4"
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
