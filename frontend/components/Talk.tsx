import { CSSProperties } from 'react'
import styles from '../styles/talk-app.module.scss'

export interface TalkProps {
  content: string
  sentFrom: 'myself' | 'others'
}

export const Talk: React.FC<TalkProps> = ({ content, sentFrom }) => {
  const MYSELF_COLOR = '#5ebbf2' // Blue
  const OTHERS_COLOR = '#00dc30' // Green
  const BORDER_RADIUS = '10px'

  const style: CSSProperties = {
    backgroundColor: sentFrom === 'myself' ? MYSELF_COLOR : OTHERS_COLOR,
    borderTopLeftRadius: sentFrom === 'myself' ? BORDER_RADIUS : 0,
    borderTopRightRadius: sentFrom === 'myself' ? 0 : BORDER_RADIUS,
  }

  return (
    <a role="button" style={style} className={styles.talk}>
      {content}
    </a>
  )
}
