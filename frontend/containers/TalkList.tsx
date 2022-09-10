import { TalkListButton } from '../components/TalkApp/TalkListButton'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'
import { Talkroom } from '../types'
import { TalkListActionButton } from '../components/TalkApp/TalkListActionButton'
import { TestID } from '../resources/TestID'
import { useUserInfo } from '../contexts/UserInfoProvider'

export interface TalkListProps {
  width: string
  setOpenTalkroom: (talkroom: Talkroom) => void
  openTalkroom: Talkroom | undefined
  talkrooms: Talkroom[]
  newTalkroomFormID: string
  talkroomMenuID: string
  setMenuTalkroom: (talkroom: Talkroom) => void
}

export const TalkList: React.FC<TalkListProps> = ({
  width,
  setOpenTalkroom,
  openTalkroom,
  talkrooms,
  newTalkroomFormID,
  talkroomMenuID,
  setMenuTalkroom,
}) => {
  const { group } = useUserInfo()

  return (
    <section
      style={{ width: width }}
      className={toClass('h-100', styles.talk_list)}
    >
      {group && (
        <>
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
              modalID={newTalkroomFormID}
              testID={TestID.NEW_TALKROOM_BUTTON}
            />
          </div>
          <ul className="p-0">
            {talkrooms.map((talkroom) => (
              <TalkListButton
                key={talkroom.id}
                title={talkroom.name}
                open={talkroom.id === openTalkroom?.id}
                talkroomMenuID={talkroomMenuID}
                talkroom={talkroom}
                setOpenTalkroom={setOpenTalkroom}
                setMenuTalkroom={setMenuTalkroom}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
