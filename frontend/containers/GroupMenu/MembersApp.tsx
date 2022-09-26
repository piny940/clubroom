import { useUserInfo } from '../../contexts/UserInfoProvider'

export const MembersApp: React.FC = () => {
  const { group } = useUserInfo()

  return (
    <div className="container">
      {group ? group.name : 'Group is not selected'}
    </div>
  )
}
