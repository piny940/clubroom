import styles from '../styles/talk-app.module.scss'
import { toClass } from '../utils/helpers'

export const TalkListButton: React.FC = () => {
  return (
    <li className={toClass(styles.talk_list_button)}>
      <a role="button" className="w-100 h-100 d-block pt-2 ps-4">
        <h5>トーク名</h5>
        <div className="detail small text-secondary ms-3">最後のトーク</div>
      </a>
    </li>
  )
}
