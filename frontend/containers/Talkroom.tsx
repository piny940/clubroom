import { TalkForm } from '../components/TalkForm'
import { Talks } from '../components/Talks'
import styles from '../styles/talk-app.module.scss'

export interface TalkroomInterface {
  width: string
}

export const Talkroom: React.FC<TalkroomInterface> = ({ width }) => {
  return (
    <section style={{ width: width }} className={styles.talk_room}>
      <Talks />
      <TalkForm />
    </section>
  )
}
