import { TalkListButton } from '../components/TalkListButton'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'
import { useGroupState } from '../contexts/GroupStateProvider'
import { useEffect, useState } from 'react'
import { Talkroom } from '../types'
import { fetchTalkrooms } from '../utils/api'

export interface TalkListInterface {
  width: string
  setOpenTalkroom: (talkroom: Talkroom) => void
  openTalkroom: Talkroom | undefined
}

export const TalkList: React.FC<TalkListInterface> = ({
  width,
  setOpenTalkroom,
  openTalkroom,
}) => {
  const { group } = useGroupState()

  const [talkrooms, setTalkrooms] = useState<Talkroom[]>([])

  const _updateTalkroomList = async () => {
    if (!group) return

    setTalkrooms(await fetchTalkrooms(group.id))
  }

  useEffect(() => {
    void _updateTalkroomList()
  }, [group])

  return (
    <section
      style={{ width: width }}
      className={toClass('h-100', styles.talk_list)}
    >
      <ul className="p-0">
        {talkrooms.map((talkroom) => (
          <TalkListButton
            key={talkroom.id}
            title={talkroom.name}
            handler={() => setOpenTalkroom(talkroom)}
            open={talkroom.id === openTalkroom?.id}
          />
        ))}
      </ul>
    </section>
  )
}
