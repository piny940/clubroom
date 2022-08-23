import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAlertsState } from '../containers/AlertsStateProvider'
import { AlertInput } from '../types'

export const usePageChange = (handler: () => void) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handler)

    return () => {
      router.events.off('routeChangeComplete', handler)
    }
  })
}

export const useMovePage = () => {
  const router = useRouter()
  const { setAlerts } = useAlertsState()
  return async (url: string, ...alerts: AlertInput[]) => {
    await router.push(url)
    setAlerts(...alerts)
  }
}
