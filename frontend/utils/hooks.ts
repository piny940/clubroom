import { useState } from "react"
import { Alert, AlertState } from "../types"

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [nextAlertId, setNextAlertId] = useState(0)
  const addAlert = (alert: { content : string, state : AlertState}) => {
    const newAlert: Alert = {
      content: alert.content,
      state: alert.state,
      id: nextAlertId,
      hasShown: false,
    }
    setAlerts([...alerts, newAlert])
    setNextAlertId(nextAlertId + 1)
  }
  
  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return { alerts, addAlert, removeAlert }
}
