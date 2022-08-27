import styles from '../styles/talk-app.module.scss'

export interface TalkroomInterface {
  width: string
}

export const Talkroom: React.FC<TalkroomInterface> = ({ width }) => {
  return (
    <div style={{ width: width }} className={styles.talk_room}>
      <div></div>
      <form id={styles.talk_form}>
        <textarea className="form-control" placeholder="トークを入力" />
        <button className="btn">
          <span className="material-icons text-primary">send</span>
        </button>
      </form>
    </div>
  )
}
