import { Modal } from '../components/Common/Modal'
import { Talkroom } from '../types'
import styles from '../styles/talk-app.module.scss'

export interface TalkroomMenuProps {
  targetID: string
  menuTalkroom?: Talkroom
}

export const TalkroomMenu: React.FC<TalkroomMenuProps> = ({
  targetID,
  menuTalkroom,
}) => {
  return (
    <Modal targetID={targetID} title={menuTalkroom?.name} scrollable>
      <div className="container p-5" id={styles.talkroom_menu}>
        <div className="row my-2">
          <div className="col-md-3 fw-bold">メンバー</div>
          <div className="col-md-9"></div>
        </div>
        <div className="row my-2">
          <div className="col-md-3 fw-bold"></div>
          <div className="col-md-9"></div>
        </div>
      </div>
    </Modal>
  )
}
