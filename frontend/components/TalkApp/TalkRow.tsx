import { useUserInfo } from '../../contexts/UserInfoProvider'
import { TestID } from '../../resources/TestID'
import { Talk as TalkType } from '../../resources/types'
import { toClass } from '../../utils/helpers'
import { AccountIcon } from '../Common/AccountIcon'
import { Talk } from './Talk'
import styles from '../../styles/talk-app.module.scss'

export interface TalkRowProps {
  talk: TalkType
}

export const TalkRow: React.FC<TalkRowProps> = ({ talk }) => {
  const { user } = useUserInfo()

  return (
    <li
      className={toClass(
        'w-100 my-3 px-4 d-flex align-items-end',
        `flex-row${talk.from_user_id === user?.id ? '-reverse' : ''}`
      )}
      data-testid={TestID.TALK_ROW}
    >
      <div
        className={toClass(
          `m${talk.from_user_id === user?.id ? 's' : 'e'}-1`,
          'd-flex flex-column align-items-center'
        )}
      >
        <AccountIcon theme="light" size={27} src={talk.from_user.global_icon} />
        <div className={styles.from_user_name}>{talk.from_user.name}</div>
      </div>
      <Talk talk={talk} />
    </li>
  )
}
