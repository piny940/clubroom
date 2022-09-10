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
import { TalkroomMenuForm } from '../components/TalkApp/TalkroomMenuForm'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TalkroomMenuActionButton } from '../components/TalkApp/TalkroomMenuActionButton'

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
  const { register, reset, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

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

  const _submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    reset()
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
        <TalkroomMenuForm
          name="name"
          label="トークルーム名"
          register={register}
          onSubmit={handleSubmit(_submit)}
        />
        <div className="row my-3">
          <div className="col-md-3 fw-bold">メンバー</div>
          <div className="col-md-9">
            {members.map((user) => user.name).join(', ')}
          </div>
        </div>
        {talkEntry?.role === 'staff' && (
          <TalkroomMenuActionButton
            label="トークルームを削除"
            handler={_deleteTalkroom}
          />
        )}
      </div>
    </Modal>
  )
}
