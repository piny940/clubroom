import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'

export interface TalkroomInterface {
  width: string
}

export const Talkroom: React.FC<TalkroomInterface> = ({ width }) => {
  return (
    <div style={{ width: width }} className={toClass(styles.talk_room)}>
      トークルーム
    </div>
  )
}
