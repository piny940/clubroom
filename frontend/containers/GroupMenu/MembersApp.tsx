import { useEffect, useState } from 'react'
import { useUserInfo } from '../../contexts/UserInfoProvider'
import { Joining } from '../../resources/types'
import { fetchJoining } from '../../utils/api'

export const MembersApp: React.FC = () => {
  const { group } = useUserInfo()
  const [joining, setJoining] = useState<Joining>()

  const _updateJoining = async () => {
    if (!group) {
      setJoining(undefined)
      return
    }

    setJoining(await fetchJoining(group.id))
  }

  useEffect(() => {
    void _updateJoining()
  }, [])

  return (
    <div className="container my-4 mx-5">
      <h3>メンバー</h3>
      <div className="container">
        <ul></ul>
      </div>
    </div>
  )
}
