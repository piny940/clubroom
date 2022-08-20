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

const AlertsStateContext = createContext(defaultAlertState)

const useAlertsState = () => useContext(AlertsStateContext)

interface AlertsStateProviderProps {
  children: React.ReactNode
}

const AlertsStateProvider: React.FC<AlertsStateProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const value: AlertsStateContextInterface = {
    alerts, setAlerts
  }

  return <AlertsStateContext.Provider value={value}>{children}</AlertsStateContext.Provider>
}

export { useAlertsState, AlertsStateProvider }
