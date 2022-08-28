import { CSSProperties } from 'react'
import { TestID } from '../resources/TestID'
import styles from '../styles/talk-app.module.scss'
import {
  MY_TALK_COLOR,
  OTHERS_TALK_COLOR,
  TALK_BORDER_RADIUS,
} from '../resources/constants'

export interface TalkProps {
  content: string
  sentFrom: 'myself' | 'others'
}

export const Talk: React.FC<TalkProps> = ({ content, sentFrom }) => {
  const style: CSSProperties = {
    backgroundColor: sentFrom === 'myself' ? MY_TALK_COLOR : OTHERS_TALK_COLOR,
    borderTopLeftRadius: sentFrom === 'myself' ? TALK_BORDER_RADIUS : 0,
    borderTopRightRadius: sentFrom === 'myself' ? 0 : TALK_BORDER_RADIUS,
  }

  return (
    <a
      role="button"
      style={style}
      className={styles.talk}
      data-testid={TestID.TALK}
    >
      {content}
    </a>
  )
}
