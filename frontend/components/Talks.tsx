import { TalkRow } from './TalkRow'
import styles from '../styles/talk-app.module.scss'
import { useEffect } from 'react'

export const Talks: React.FC = () => {
  const _scrollToBottom = () => {
    document.getElementById('inner-talks')?.scrollIntoView(false)
  }

  useEffect(_scrollToBottom, [])

  return (
    <section id={styles.talks}>
      <ul className="px-0 pb-1 m-0" id="inner-talks">
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
