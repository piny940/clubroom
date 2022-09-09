import { Modal } from '../components/Common/Modal'
import { Talkroom, User } from '../types'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useState } from 'react'
import { fetchTalkroomMembers } from '../utils/api'

export interface TalkroomMenuProps {
  targetID: string
  menuTalkroom?: Talkroom
}

export const TalkroomMenu: React.FC<TalkroomMenuProps> = ({
  targetID,
  menuTalkroom,
}) => {
  const [members, setMembers] = useState<User[]>([])

  const _updateMembers = async () => {
    if (!menuTalkroom) return

    setMembers(await fetchTalkroomMembers(menuTalkroom))
  }

  useEffect(() => {
    void _updateMembers()
  }, [menuTalkroom])

  return (
    <Modal targetID={targetID} title={menuTalkroom?.name} scrollable>
      <div className="container py-4 px-5" id={styles.talkroom_menu}>
        <div className="row my-3">
          <div className="col-md-3 fw-bold">メンバー</div>
          <div className="col-md-9 overwrap-auto">
            {members.map((user) => user.name).join(', ')}
          </div>
        </div>
        <div className="row my-3">
          <button className="col-md-8 offset-md-2 btn btn-danger">
            トークルームを削除
          </button>
        </div>
      </div>
    </Modal>
  )
}
