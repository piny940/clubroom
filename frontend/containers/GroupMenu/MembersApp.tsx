import { useEffect, useState } from 'react'
import { useUserInfo } from '../../contexts/UserInfoProvider'
import { Joining, User } from '../../resources/types'
import { fetchGroupMembers, fetchJoining } from '../../utils/api'

export const MembersApp: React.FC = () => {
  const { group } = useUserInfo()
  const [joining, setJoining] = useState<Joining>()
  const [members, setMembers] = useState<User[]>([])

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
        <ul>{members.map((member) => member.name).join(', ')}</ul>
      </div>
    </div>
  ) : (
    <></>
  )
}
