import { AskLogin } from '../components/Common/AskLogin'
import { LoginRequired } from './LoginRequired'
import { TalkList } from './TalkList'
import { Talkroom } from './Talkroom'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useState } from 'react'
import { Talkroom as TalkroomType } from '../types'
import { useGroupState } from '../contexts/GroupStateProvider'
import { fetchTalkrooms } from '../utils/api'

export const TalkApp: React.FC = () => {
  const { group } = useGroupState()
  const [openTalkroom, setOpenTalkroom] = useState<TalkroomType>()
  const [talkrooms, setTalkrooms] = useState<TalkroomType[]>([])

  const updateTalkroomList = async () => {
    if (!group) return

    setTalkrooms(await fetchTalkrooms(group.id))
  }

  useEffect(() => {
    void updateTalkroomList()
    setOpenTalkroom(undefined)
  }, [group])

  return (
    <LoginRequired whenNoUser={<AskLogin />}>
      <div className="d-flex" id={styles.app}>
        <TalkList
          width="25%"
          setOpenTalkroom={setOpenTalkroom}
          openTalkroom={openTalkroom}
          talkrooms={talkrooms}
          updateTalkroomList={updateTalkroomList}
        />
        <Talkroom width="75%" openTalkroom={openTalkroom} />
      </div>
    </LoginRequired>
  )
}
