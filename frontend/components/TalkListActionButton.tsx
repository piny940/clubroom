import { MouseEventHandler } from 'react'
import { toClass } from '../utils/helpers'
import styles from '../styles/talk-app.module.scss'

export interface TalkListActionButtonProps {
  handler: MouseEventHandler
  iconName: string
  label: string
  iconColor: string
  modalID?: string
  testID: string
}

export const TalkListActionButton: React.FC<TalkListActionButtonProps> = ({
  handler,
  iconName,
  label,
  iconColor,
  modalID,
  testID,
}) => {
  return (
    <a
      onClick={handler}
      className={toClass('d-flex', styles.action_button)}
      data-bs-toggle={modalID ? 'modal' : ''}
      data-bs-target={modalID ? '#' + modalID : ''}
      data-testid={testID}
    >
      <span className="material-icons me-1" style={{ color: iconColor }}>
        {iconName}
      </span>
      {label}
    </a>
  )
}
