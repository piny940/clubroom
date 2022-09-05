import { TalkRow } from './TalkRow'
import styles from '../../styles/talk-app.module.scss'
import { RefObject } from 'react'
import { Talk } from '../../types'

export interface TalksProps {
  talks: Talk[]
  userID?: number
  talksRef: RefObject<HTMLUListElement>
}

export const Talks: React.FC<TalksProps> = ({ talks, userID, talksRef }) => {
  return (
    <section id={styles.talks}>
      <ul className="px-0 pb-1 m-0" ref={talksRef}>
        {userID ? (
          talks.map((talk) => (
            <TalkRow
              content={talk.content}
              sentFrom={talk.from_user_id === userID ? 'myself' : 'others'}
              key={talk.id}
            />
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  )
}
