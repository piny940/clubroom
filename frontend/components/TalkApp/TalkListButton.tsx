import { TestID } from '../../resources/TestID'
import styles from '../../styles/talk-app.module.scss'
import { Talkroom } from '../../resources/types'
import { toClass } from '../../utils/helpers'
import { MaterialIcon } from '../Common/MaterialIcon'

export interface TalkListButtonProps {
  detail?: string
  title: string
  open: boolean
  talkroomMenuID: string
  talkroom: Talkroom
  setOpenTalkroom: (talkroom: Talkroom) => void
  setMenuTalkroom: (talkroom: Talkroom) => void
}

export const TalkListButton: React.FC<TalkListButtonProps> = ({
  detail,
  title,
  open,
  talkroomMenuID,
  talkroom,
  setOpenTalkroom,
  setMenuTalkroom,
}) => {
  return (
    <li
      className={toClass(
        'position-relative',
        open ? styles.open : '',
        styles.talk_list_button
      )}
    >
      <a
        role="button"
        className={toClass('h-100 d-block pt-2 pe-1', styles.open_button)}
        onClick={() => setOpenTalkroom(talkroom)}
        data-testid={TestID.TALK_LIST_BUTTON}
      >
        <h5>{title}</h5>
        {detail ? (
          <div className="detail small text-secondary ms-3">{detail}</div>
        ) : (
          <></>
        )}
      </a>

      <a
        role="button"
        className={styles.menu_button}
        data-bs-target={'#' + talkroomMenuID}
        data-bs-toggle="modal"
        onClick={() => setMenuTalkroom(talkroom)}
        data-testid={TestID.TALKROOM_MENU_BUTTON}
      >
        <MaterialIcon name="settings" />
      </a>
    </li>
  )
}
