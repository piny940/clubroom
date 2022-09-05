import { TalkListButton } from '../components/TalkListButton'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'
import { useGroupState } from '../contexts/GroupStateProvider'
import { useEffect, useState } from 'react'
import { Talkroom } from '../types'
import { fetchTalkrooms } from '../utils/api'
import { TalkListActionButton } from '../components/TalkListActionButton'
import { NewTalkroomForm } from './NewTalkroomForm'
import { TestID } from '../resources/TestID'

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

  const updateTalkroomList = async () => {
    if (!group) return

    setTalkrooms(await fetchTalkrooms(group.id))
  }

  useEffect(() => {
    void updateTalkroomList()
  }, [group])

  return (
    <section
      style={{ width: width }}
      className={toClass('h-100', styles.talk_list)}
    >
      {group ? (
        <div
          className={toClass(
            'ps-4 pe-1 py-2 d-flex flex-column',
            styles.action_buttons
          )}
        >
          <TalkListActionButton
            handler={() => undefined}
            iconName="add_circle"
            label="新規トークルーム作成"
            iconColor="#00d77b" // Green
            modalID="new-talkroom"
            testID={TestID.NEW_TALKROOM_BUTTON}
          />
        </div>
      ) : (
        <></>
      )}
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
      <NewTalkroomForm
        targetID="new-talkroom"
        updateTalkroomList={updateTalkroomList}
        setOpenTalkroom={setOpenTalkroom}
      />
    </section>
  )
}
