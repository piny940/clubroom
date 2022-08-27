import { TalkListButton } from '../components/TalkListButton'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'

export interface TalkListInterface {
  width: string
}

export const TalkList: React.FC<TalkListInterface> = ({ width }) => {
  return (
    <div
      style={{ width: width }}
      className={toClass('h-100', styles.talk_list)}
    >
      <ul className="p-0">
        <TalkListButton />
        <TalkListButton />
      </ul>
    </div>
  )
}
