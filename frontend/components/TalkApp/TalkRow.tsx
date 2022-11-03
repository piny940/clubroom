import { useUserInfo } from '../../contexts/UserInfoProvider'
import { TestID } from '../../resources/TestID'
import { Talk as TalkType } from '../../resources/types'
import { toClass } from '../../utils/helpers'
import { Talk } from './Talk'

export interface TalkRowProps {
  talk: TalkType
}

export const TalkRow: React.FC<TalkRowProps> = ({ talk }) => {
  const { user } = useUserInfo()

  return (
    <li
      className={toClass(
        'w-100 my-2 px-4 d-flex',
        `justify-content-${talk.from_user_id === user?.id ? 'end' : 'start'}`
      )}
      data-testid={TestID.TALK_ROW}
    >
      <Talk talk={talk} />
    </li>
  )
}
