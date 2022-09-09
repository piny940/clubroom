import { Modal } from '../components/Common/Modal'
import { Talkroom } from '../types'

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
      <div className="container"></div>
    </Modal>
  )
}
