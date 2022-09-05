import { TestID } from '../../resources/TestID'
import { Alert as AlertType } from '../../types'
import { AlertState } from '../../utils/enums'
import styles from '../../styles/common.module.scss'
import { toClass } from '../../utils/helpers'
import { MouseEventHandler, useEffect } from 'react'
import { Icon } from './Icon'

export interface AlertProps {
  alert: AlertType
  margin: 'm-0' | 'mt-1'
  removeAlert: (id: number) => void
}

export const Alert: React.FC<AlertProps> = ({ alert, margin, removeAlert }) => {
  const CLOSE_TIME = 5000

  let className = ''
  switch (alert.state) {
    case AlertState.DANGER:
      className = 'alert alert-danger'
      break
    case AlertState.NOTICE:
      className = 'alert alert-info'
      break
    case AlertState.SUCCESS:
      className = 'alert alert-success'
      break
  }

  const _close: MouseEventHandler = (e) => {
    removeAlert(alert.id)
  }

  useEffect(() => {
    setTimeout(() => {
      removeAlert(alert.id)
    }, CLOSE_TIME)
  }, [])

  return (
    <div
      className={toClass(
        className,
        styles.alert,
        margin,
        'd-flex align-items-center justify-content-between'
      )}
      data-testid={TestID.ALERT}
    >
      <div>{alert.content}</div>
      <a role="button" onClick={_close} data-testid={TestID.ALERT_CLOSE}>
        <Icon name="close" />
      </a>
    </div>
  )
}
