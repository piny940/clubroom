import { AskLogin } from '../components/AskLogin'
import { LoginRequired } from './LoginRequired'
import { TalkList } from './TalkList'
import { Talkroom } from './Talkroom'
import styles from '../styles/talk-app.module.scss'

export const TalkApp: React.FC = () => {
  return (
    <LoginRequired whenNoUser={<AskLogin />}>
      <div className="d-flex" id={styles.app}>
        <TalkList width="25%" />
        <Talkroom width="75%" />
      </div>
    </LoginRequired>
  )
}
