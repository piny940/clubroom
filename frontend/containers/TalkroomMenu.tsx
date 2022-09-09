import { Modal } from '../components/Common/Modal'
import { TalkEntry, Talkroom, User } from '../types'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useRef, useState } from 'react'
import {
  deleteTalkroom,
  fetchTalkEntry,
  fetchTalkroomMembers,
} from '../utils/api'
import { Message } from '../resources/Messages'

export interface TalkroomMenuProps {
  targetID: string
  menuTalkroom?: Talkroom
  updateTalkroomList: () => Promise<void>
}

export const TalkroomMenu: React.FC<TalkroomMenuProps> = ({
  targetID,
  menuTalkroom,
  updateTalkroomList,
}) => {
  const [members, setMembers] = useState<User[]>([])
  const [talkEntry, setTalkEntry] = useState<TalkEntry>()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const _closeModal = () => {
    closeButtonRef.current?.click()
  }

  const _updateMembers = async () => {
    if (!menuTalkroom) return

    setMembers(await fetchTalkroomMembers(menuTalkroom))
  }

  const _updateTalkEntry = async () => {
    if (!menuTalkroom) return

    setTalkEntry(await fetchTalkEntry(menuTalkroom))
  }

  const _deleteTalkroom = async () => {
    if (!menuTalkroom) return
    if (!window.confirm(Message.DELETE_CONFIRMATION)) return

    await deleteTalkroom(menuTalkroom)
    _closeModal()
    void updateTalkroomList()
  }

  useEffect(() => {
    void _updateMembers()
    void _updateTalkEntry()
  }, [menuTalkroom])

  return (
    <Modal
      targetID={targetID}
      title={menuTalkroom?.name}
      scrollable
      closeButtonRef={closeButtonRef}
    >
      <div className="container py-4 px-5" id={styles.talkroom_menu}>
        <div className="row my-3">
          <div className="col-md-3 fw-bold">メンバー</div>
          <div className="col-md-9 overwrap-auto">
            {members.map((user) => user.name).join(', ')}
          </div>
        </div>
        {talkEntry?.role === 'staff' && (
          <div className="row my-3">
            <button
              className="col-md-8 offset-md-2 btn btn-danger"
              onClick={_deleteTalkroom}
            >
              トークルームを削除
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
