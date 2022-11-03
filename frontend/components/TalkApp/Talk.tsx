import { CSSProperties } from 'react'
import { TestID } from '../../resources/TestID'
import styles from '../../styles/talk-app.module.scss'
import {
  MY_TALK_COLOR,
  OTHERS_TALK_COLOR,
  TALK_BORDER_RADIUS,
} from '../../resources/constants'
import { Talk as TalkType } from '../../resources/types'
import { useUserInfo } from '../../contexts/UserInfoProvider'

export interface TalkProps {
  talk: TalkType
}

export const Talk: React.FC<TalkProps> = ({ talk }) => {
  const { user } = useUserInfo()

  const style: CSSProperties = {
    backgroundColor:
      talk.from_user_id === user?.id ? MY_TALK_COLOR : OTHERS_TALK_COLOR,
    borderTopLeftRadius:
      talk.from_user_id === user?.id ? TALK_BORDER_RADIUS : 0,
    borderTopRightRadius:
      talk.from_user_id === user?.id ? 0 : TALK_BORDER_RADIUS,
  }

  return (
    <a
      role="button"
      style={style}
      className={styles.talk}
      data-testid={TestID.TALK}
    >
      {talk.content}
    </a>
  )
}
