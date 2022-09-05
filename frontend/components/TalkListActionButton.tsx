import { MouseEventHandler } from 'react'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'

export interface TalkListActionButtonProps {
  handler: MouseEventHandler
  iconName: string
  label: string
  iconColor: string
}

export const TalkListActionButton: React.FC<TalkListActionButtonProps> = ({
  handler,
  iconName,
  label,
  iconColor,
}) => {
  return (
    <a onClick={handler} className={toClass('d-flex', styles.action_button)}>
      <span className="material-icons me-1" style={{ color: iconColor }}>
        {iconName}
      </span>
      {label}
    </a>
  )
}
