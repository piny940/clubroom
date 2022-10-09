import { useEffect, useState } from 'react'
import { CopyTextBox } from '../../components/Common/CopyTextBox'
import { Description } from '../../components/GroupMenu/Description'
import { useUserInfo } from '../../contexts/UserInfoProvider'
import { HOST } from '../../resources/constants'
import { Joining, User } from '../../resources/types'
import { fetchGroupMembers, fetchJoining } from '../../utils/api'

export const MembersApp: React.FC = () => {
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
    <div className="container my-4 mx-5">
      <h3>メンバー</h3>
      <div className="mx-5 my-3">
        <Description label="メンバー">
          <ul>{members.map((member) => member.name).join(', ')}</ul>
        </Description>
        <Description label="招待URL">
          <CopyTextBox text={entryURL} />
        </Description>
      </div>
    </div>
  ) : (
    <></>
  )
}
