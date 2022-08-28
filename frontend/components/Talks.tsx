import { TalkRow } from './TalkRow'
import styles from '../styles/talk-app.module.scss'
import { useEffect } from 'react'
import { Talk } from '../types'

export interface TalksProps {
  talks: Talk[]
  userID: number
}

export const Talks: React.FC<TalksProps> = ({ talks, userID }) => {
  const _scrollToBottom = () => {
    document.getElementById('inner-talks')?.scrollIntoView(false)
  }

  useEffect(_scrollToBottom, [])

  return (
    <section id={styles.talks}>
      <ul className="px-0 pb-1 m-0" id="inner-talks">
        {talks.map((talk) => (
          <TalkRow
            content={talk.content}
            sentFrom={talk.from_user_id === userID ? 'myself' : 'others'}
            key={talk.id}
          />
        ))}
      </ul>
    </section>
  )
}
