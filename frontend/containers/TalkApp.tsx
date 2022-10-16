import { LoginRequired } from './LoginRequired'
import { TalkList } from './TalkList'
import { Talkroom } from './Talkroom'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useState } from 'react'
import { Talkroom as TalkroomType } from '../resources/types'
import { fetchTalkrooms } from '../utils/api'
import { NewTalkroomForm } from './NewTalkroomForm'
import { TalkroomMenu } from './TalkroomMenu'
import { useUserInfo } from '../contexts/UserInfoProvider'

export const TalkApp: React.FC = () => {
  const newTalkroomID = 'new-talkroom'
  const talkroomMenuID = 'talkroom-menu'

  const { group } = useUserInfo()
  const [openTalkroom, setOpenTalkroom] = useState<TalkroomType>()
  const [talkrooms, setTalkrooms] = useState<TalkroomType[]>([])
  const [menuTalkroom, setMenuTalkroom] = useState<TalkroomType>()

  const updateTalkroomList = async () => {
    if (!group) return

    setTalkrooms(await fetchTalkrooms(group.id))
  }

  useEffect(() => {
    void updateTalkroomList()
    setOpenTalkroom(undefined)
  }, [group])

  return (
    <LoginRequired>
      <div className="row m-0" id={styles.app}>
        <TalkList
          setOpenTalkroom={setOpenTalkroom}
          openTalkroom={openTalkroom}
          talkrooms={talkrooms}
          newTalkroomFormID={newTalkroomID}
          talkroomMenuID={talkroomMenuID}
          setMenuTalkroom={setMenuTalkroom}
        />
        <Talkroom openTalkroom={openTalkroom} />
      </div>
      <NewTalkroomForm
        targetID={newTalkroomID}
        updateTalkroomList={updateTalkroomList}
        setOpenTalkroom={setOpenTalkroom}
      />
      <TalkroomMenu
        targetID={talkroomMenuID}
        menuTalkroom={menuTalkroom}
        updateTalkroomList={updateTalkroomList}
      />
    </LoginRequired>
  )
}
