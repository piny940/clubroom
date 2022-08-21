import { Alert as AlertType } from "../types"
import { AlertState } from "../utils/enums"

export const Alert: React.FC<{alert: AlertType}> = ({ alert }) => {
  let className = ""
  switch (alert.state) {
    case AlertState.DANGER:
      className = "alert alert-danger"
      break
    case AlertState.NOTICE:
      className = "alert alert-info"
      break
    case AlertState.SUCCESS:
      className = "alert alert-success"
      break
  }

  return (
    <div className={className}>
      { alert.content }
    </div>
  )
}
