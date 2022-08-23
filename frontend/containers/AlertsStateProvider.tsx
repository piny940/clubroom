import { createContext, useContext, useState } from 'react'
import { Alert } from '../types'
import { AlertState } from '../utils/enums'
import { usePageChange } from '../utils/hooks'

interface AlertsStateContextInterface {
  alerts: Alert[]
  addAlert: (alert: { content: string; state: AlertState }) => void
  removeAlert: (id: number) => void
}

const defaultAlertState: AlertsStateContextInterface = {
  alerts: [],
  addAlert: (alert: { content: string; state: AlertState }) => undefined,
  removeAlert: (id: number) => undefined,
}

const AlertsStateContext = createContext(defaultAlertState)

const useAlertsState = () => useContext(AlertsStateContext)

interface AlertsStateProviderProps {
  children: React.ReactNode
}

const AlertsStateProvider: React.FC<AlertsStateProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { content: 'Test', state: AlertState.DANGER, id: -1 },
  ])
  const [nextAlertId, setNextAlertId] = useState(0)

  // Remove all alerts on page change
  usePageChange(() => {
    setAlerts([])
  })

  const addAlert = (alert: { content: string; state: AlertState }) => {
    const newAlert: Alert = {
      ...alert,
      id: nextAlertId,
    }
    setAlerts([...alerts, newAlert])
    setNextAlertId(nextAlertId + 1)
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const value: AlertsStateContextInterface = {
    alerts,
    addAlert,
    removeAlert,
  }

  return (
    <AlertsStateContext.Provider value={value}>{children}</AlertsStateContext.Provider>
  )
}

export { useAlertsState, AlertsStateProvider }
