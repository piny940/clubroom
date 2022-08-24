import { createContext, ReactNode, useContext, useState } from 'react'
import { Alert, AlertInput } from '../types'
import { usePageChange } from '../utils/hooks'

interface AlertsStateContextInterface {
  alerts: Alert[]
  addAlert: (alert: AlertInput) => void
  removeAlert: (id: number) => void
  setAlerts: (...alerts: AlertInput[]) => void
}

const defaultAlertState: AlertsStateContextInterface = {
  alerts: [],
  addAlert: (alert: AlertInput) => undefined,
  removeAlert: (id: number) => undefined,
  setAlerts: (...alerts: AlertInput[]) => undefined,
}

const AlertsStateContext = createContext(defaultAlertState)

const useAlertsState = () => useContext(AlertsStateContext)

interface AlertsStateProviderProps {
  children: ReactNode
}

const AlertsStateProvider: React.FC<AlertsStateProviderProps> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [nextAlertId, setNextAlertId] = useState(0)

  const addAlert = (alert: AlertInput) => {
    const newAlert: Alert = {
      ...alert,
      id: nextAlertId,
    }
    setAlerts([...alerts, newAlert])
    setNextAlertId(nextAlertId + 1)
  }

  const _setAlerts = (...alerts: AlertInput[]) => {
    const newAlerts: Alert[] = []
    let nextId = nextAlertId
    for (const alert of alerts) {
      newAlerts.push({
        content: alert.content,
        state: alert.state,
        id: nextId,
      })
      nextId++
    }
    setAlerts(newAlerts)
    setNextAlertId(nextId)
  }

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const value: AlertsStateContextInterface = {
    alerts,
    addAlert,
    removeAlert,
    setAlerts: _setAlerts,
  }

  // Remove all alerts on page change
  usePageChange(() => {
    setAlerts([])
  })

  return (
    <AlertsStateContext.Provider value={value}>
      {children}
    </AlertsStateContext.Provider>
  )
}

export { useAlertsState, AlertsStateProvider }
