import { GroupMenuBase } from '../../components/GroupMenu/GroupMenuBase'
import { MembersApp } from '../../containers/GroupMenu/MembersApp'

const Members: React.FC = () => {
  return (
    <GroupMenuBase>
      <MembersApp />
    </GroupMenuBase>
  )
}

export default Members
