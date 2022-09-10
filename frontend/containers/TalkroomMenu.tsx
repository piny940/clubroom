import { Modal } from '../components/Common/Modal'
import { TalkEntry, Talkroom, User } from '../types'
import styles from '../styles/talk-app.module.scss'
import { useEffect, useRef, useState } from 'react'
import {
  deleteTalkroom,
  fetchTalkEntry,
  fetchTalkroomMembers,
  updateData,
} from '../utils/api'
import { Message } from '../resources/Messages'
import { TalkroomMenuForm } from '../components/TalkApp/TalkroomMenuForm'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TalkroomMenuActionButton } from '../components/TalkApp/TalkroomMenuActionButton'
import { TestID } from '../resources/TestID'
import { TalkroomMenuDetail } from '../components/TalkApp/TalkroomMenuDetail'
import { useAlerts } from '../contexts/AlertsProvider'
import { AlertState } from '../utils/enums'

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
  const { register, reset, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true,
  })
  const { setAlerts } = useAlerts()

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

  const _updateTalkroomName = (talkroom: Talkroom | undefined) => {
    if (!talkroom) return
    setValue('name', talkroom.name)
  }

  const _submit: SubmitHandler<FieldValues> = (data) => {
    if (!menuTalkroom) {
      throw new Error(Message.TALKROOM_NOT_SELECTED_ERROR)
    }

    const _onSuccess = (json: any) => {
      reset()
      _closeModal()
      void updateTalkroomList()
      setAlerts({
        content: 'トークルーム名を更新しました。',
        state: AlertState.SUCCESS,
      })
    }

    void updateData({
      url: `/member/groups/${menuTalkroom.group_id}/talkrooms/${menuTalkroom.id}`,
      data: data,
      scope: 'talkroom',
      onSuccess: _onSuccess,
      onFail: () => undefined, // TODO
    })
  }

  useEffect(() => {
    _updateTalkroomName(menuTalkroom)
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
        {talkEntry?.role === 'staff' && (
          <TalkroomMenuForm
            name="name"
            label="トークルーム名"
            register={register}
            onSubmit={handleSubmit(_submit)}
            testID={TestID.TALKROOM_MENU_NAME_FORM}
            submitButtonText="更新"
            requiredMessage={Message.INPUT_REQUIRED}
          />
        )}
        <TalkroomMenuDetail
          title="メンバー"
          content={members.map((user) => user.name).join(', ')}
        />
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
