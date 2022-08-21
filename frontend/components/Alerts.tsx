import { useAlertsState } from "../containers/AlertsStateProvider"
import { Alert } from "./Alert"

export const Alerts: React.FC = () => {
  const { alerts } = useAlertsState()

  if (!alerts.length) {
    return <></>
  }

  return (
    <div>
      {alerts.map((alert) => (
        <Alert alert={alert} key={alert.id} />
      ))}
    </div>
  )
}
