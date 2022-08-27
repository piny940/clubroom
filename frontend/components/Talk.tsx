import { CSSProperties } from 'react'
import styles from '../styles/talk-app.module.scss'

export const Talk: React.FC = () => {
  const style: CSSProperties = {
    backgroundColor: '#5ebbf2', // Blue
    borderRadius: '10px',
  }

  return (
    <a role="button" style={style} className={styles.talk}>
      トークああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
    </a>
  )
}
