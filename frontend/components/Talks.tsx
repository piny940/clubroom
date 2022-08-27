import { TalkRow } from './TalkRow'
import styles from '../styles/talk-app.module.scss'

export const Talks: React.FC = () => {
  return (
    <section>
      <ul className="px-0 pb-1 m-0" id={styles.talks}>
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
        <TalkRow />
      </ul>
    </section>
  )
}
