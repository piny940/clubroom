import { useEffect, useRef, useState } from 'react'
import { CopyTextBox } from '../components/Common/CopyTextBox'
import { DetailDescription } from '../components/Common/DetailDescription'
import { Modal } from '../components/Common/Modal'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { HOST } from '../resources/constants'
import { Joining, User } from '../resources/types'
import { fetchApi, fetchGroupMembers, fetchJoining } from '../utils/api'
import styles from '../styles/navbar.module.scss'
import { ModalMenuActionButton } from '../components/Common/ModalMenuActionButton'
import { useAlerts } from '../contexts/AlertsProvider'
import { AlertState } from '../resources/enums'

export interface GroupMenuProp {
  targetID: string
}

export const GroupMenu: React.FC<GroupMenuProp> = ({ targetID }) => {
  const { group, updateGroups, setGroup } = useUserInfo()
  const { setAlerts } = useAlerts()
  const [joining, setJoining] = useState<Joining>()
  const [members, setMembers] = useState<User[]>([])
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const entryURL = group
    ? `${HOST}/group_entry?entry_token=${group.entry_token}&group_id=${group.id}`
    : ''

  const _updateJoining = async () => {
    if (!group) return

    setJoining(await fetchJoining(group.id))
  }

  const _updateMembers = async () => {
    if (!group) return

    setMembers(await fetchGroupMembers(group.id))
  }

  const _closeModal = () => closeButtonRef.current?.click()

  const _quitGroup = async () => {
    if (!group) return

    const response = await fetchApi({
      url: `/member/groups/${group.id}/joining`,
      method: 'DELETE',
    })
    const json = await response.json()
    if (response.status >= 400) {
      throw new Error(json.message)
    } else {
      _closeModal()
      void updateGroups()
      setGroup(undefined)
      setAlerts({
        content: 'グループから抜けました。',
        state: AlertState.NOTICE,
      })
    }
  }

  const _deleteGroup = async () => {
    if (!group) return

    const response = await fetchApi({
      url: `/member/groups/${group.id}`,
      method: 'DELETE',
    })
    const json = await response.json()

    if (response.status >= 400) {
      throw new Error(json.message)
    } else {
      _closeModal()
      void updateGroups()
      setGroup(undefined)
      setAlerts({
        content: 'グループを削除しました。',
        state: AlertState.NOTICE,
      })
    }
  }

  useEffect(() => {
    void _updateJoining()
    void _updateMembers()
  }, [group])

  return group && joining ? (
    <Modal
      closeButtonRef={closeButtonRef}
      title={group.name}
      targetID={targetID}
    >
      <div className="container py-4 px-5" id={styles.group_menu}>
        <DetailDescription
          title="メンバー"
          content={members.map((member) => member.name).join(', ')}
        />
        {joining.role === 'admin' || joining.role === 'staff' ? (
          <div className="row my-3">
            <div className="col-md-3 fw-bold">招待URL</div>
            <CopyTextBox text={entryURL} className="col-md-9" />
          </div>
        ) : (
          <></>
        )}
        <ModalMenuActionButton
          label="グループから抜ける"
          handler={_quitGroup}
        />
        {joining.role === 'admin' || joining.role === 'staff' ? (
          <ModalMenuActionButton
            label="グループを削除する"
            handler={_deleteGroup}
          />
        ) : (
          <></>
        )}
      </div>
    </Modal>
  ) : (
    <></>
  )
}
