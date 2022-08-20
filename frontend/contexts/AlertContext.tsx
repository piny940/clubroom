import { createContext, useContext, useState } from "react";
import { Alert } from "../types";

interface AlertsStateContextInterface {
  alerts: Alert[]
  setAlerts: (alerts: Alert[]) => void
}

const defaultAlertState: AlertsStateContextInterface = {
  alerts: [],
  setAlerts: (alerts: Alert[]) => undefined
}

const alertsStateContext = createContext(defaultAlertState)

const useAlertsState = () => useContext(alertsStateContext)

interface AlertsStateProviderProps {
  children: React.ReactNode
}

const AlertsStateProvider: React.FC<AlertsStateProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const value: AlertsStateContextInterface = {
    alerts, setAlerts
  }

  return <alertsStateContext.Provider value={value}>{children}</alertsStateContext.Provider>
}

export { useAlertsState, AlertsStateProvider }
