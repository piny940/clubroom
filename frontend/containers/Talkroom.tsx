import { useEffect, useState } from 'react'
import { TalkForm } from '../components/TalkForm'
import { Talks } from '../components/Talks'
import { useUserState } from '../contexts/UserStateProvider'
import styles from '../styles/talk-app.module.scss'
import { Talk, Talkroom as TalkroomType } from '../types'
import { fetchTalks } from '../utils/api'

export interface TalkroomInterface {
  width: string
  openTalkroom: TalkroomType | null
}

export const Talkroom: React.FC<TalkroomInterface> = ({
  width,
  openTalkroom,
}) => {
  const [talks, setTalks] = useState<Talk[]>([])
  const { user } = useUserState()

  const _updateTalks = async () => {
    if (!openTalkroom) {
      setTalks([])
      return
    }

    setTalks(await fetchTalks(openTalkroom))
  }

  useEffect(() => {
    void _updateTalks()
  }, [openTalkroom])

  return (
    <section style={{ width: width }} className={styles.talk_room}>
      <Talks talks={talks} userID={user?.id} />
      <TalkForm />
    </section>
  )
}
