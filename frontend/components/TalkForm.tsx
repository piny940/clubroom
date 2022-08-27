import styles from '../styles/talk-app.module.scss'

export const TalkForm: React.FC = () => {
  return (
    <form id={styles.talk_form}>
      <textarea className="form-control" placeholder="トークを入力" />
      <button className="btn">
        <span className="material-icons text-primary">send</span>
      </button>
    </form>
  )
}
