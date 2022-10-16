import { useEffect, useState } from 'react'
import { CopyTextBox } from '../components/Common/CopyTextBox'
import { DetailDescription } from '../components/Common/DetailDescription'
import { Modal } from '../components/Common/Modal'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { HOST } from '../resources/constants'
import { Joining, User } from '../resources/types'
import { fetchGroupMembers, fetchJoining } from '../utils/api'
import styles from '../styles/navbar.module.scss'

export interface GroupMenuProp {
  targetID: string
}

export const GroupMenu: React.FC<GroupMenuProp> = ({ targetID }) => {
  const { group } = useUserInfo()
  const [joining, setJoining] = useState<Joining>()
  const [members, setMembers] = useState<User[]>([])
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

  useEffect(() => {
    void _updateJoining()
    void _updateMembers()
  }, [group])

  return group && joining ? (
    <Modal title={group.name} targetID={targetID}>
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
      </div>
    </Modal>
  ) : (
    <></>
  )
}
