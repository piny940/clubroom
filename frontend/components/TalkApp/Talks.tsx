import { TalkRow } from './TalkRow'
import styles from '../../styles/talk-app.module.scss'
import { RefObject } from 'react'
import { Talk } from '../../resources/types'

export interface TalksProps {
  talks: Talk[]
  talksRef: RefObject<HTMLUListElement>
}

export const Talks: React.FC<TalksProps> = ({ talks, talksRef }) => {
  return (
    <section id={styles.talks}>
      <ul className="px-0 pb-1 m-0" ref={talksRef}>
        {talks.map((talk) => (
          <TalkRow talk={talk} key={talk.id} />
        ))}
      </ul>
    </section>
  )
}
