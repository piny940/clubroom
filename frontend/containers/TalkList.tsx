import { TalkListButton } from '../components/TalkApp/TalkListButton'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'
import { Talkroom } from '../types'
import { TalkListActionButton } from '../components/TalkApp/TalkListActionButton'
import { NewTalkroomForm } from './NewTalkroomForm'
import { TestID } from '../resources/TestID'
import { useGroupState } from '../contexts/GroupStateProvider'

export interface TalkListInterface {
  width: string
  setOpenTalkroom: (talkroom: Talkroom) => void
  openTalkroom: Talkroom | undefined
  talkrooms: Talkroom[]
  updateTalkroomList: () => void
}

export const TalkList: React.FC<TalkListInterface> = ({
  width,
  setOpenTalkroom,
  openTalkroom,
  talkrooms,
  updateTalkroomList,
}) => {
  const { group } = useGroupState()

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
