import { Modal } from '../components/Common/Modal'
import { TalkEntry, Talkroom, User } from '../types'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useState } from 'react'
import { fetchTalkEntry, fetchTalkroomMembers } from '../utils/api'

export interface TalkroomMenuProps {
  targetID: string
  menuTalkroom?: Talkroom
}

export const TalkroomMenu: React.FC<TalkroomMenuProps> = ({
  targetID,
  menuTalkroom,
}) => {
  const [members, setMembers] = useState<User[]>([])
  const [talkEntry, setTalkEntry] = useState<TalkEntry>()

  const _updateMembers = async () => {
    if (!menuTalkroom) return

    setMembers(await fetchTalkroomMembers(menuTalkroom))
  }

  const _updateTalkEntry = async () => {
    if (!menuTalkroom) return

    setTalkEntry(await fetchTalkEntry(menuTalkroom))
  }

  useEffect(() => {
    void _updateMembers()
    void _updateTalkEntry()
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
        {talkEntry?.role === 'staff' && (
          <div className="row my-3">
            <button className="col-md-8 offset-md-2 btn btn-danger">
              トークルームを削除
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
