import { MouseEventHandler } from 'react'
import { toClass } from '../../utils/helpers'
import styles from '../../styles/talk-app.module.scss'
import { Icon } from '../Common/Icon'

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
      <Icon color={iconColor} name={iconName} className="me-1" />
      {label}
    </a>
  )
}
