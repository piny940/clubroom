import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UrlObject } from 'url'
import { useAlerts } from '../contexts/AlertsProvider'
import { AlertInput } from '../resources/types'

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
  const { setAlerts } = useAlerts()
  return async (url: string | UrlObject, ...alerts: AlertInput[]) => {
    await router.push(url)
    setAlerts(...alerts)
  }
}

export const useKey = (
  callback: (event: KeyboardEvent) => void,
  key: string,
  specials: {
    meta?: boolean
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
  } = {},
  options?: {
    target?: HTMLElement
    event?: 'keydown' | 'keypress' | 'keyup'
  }
) => {
  const targetEl = options?.target || window
  const keyEvent = options?.event || 'keypress'

  const willRun = (event: KeyboardEvent) => {
    // Key
    if (key !== event.key) {
      return false
    }
    if (
      (specials.meta && !event.metaKey) ||
      (specials.ctrl && !event.ctrlKey) ||
      (specials.shift && !event.shiftKey) ||
      (specials.alt && !event.altKey)
    ) {
      return false
    }
    return true
  }

  const handleKeyEvent = (event: KeyboardEvent) => {
    if (willRun(event)) {
      callback(event)
    }
  }

  useEffect(() => {
    targetEl.addEventListener(keyEvent, handleKeyEvent as EventListener)

    return () => {
      targetEl.removeEventListener(keyEvent, handleKeyEvent as EventListener)
    }
  })
}
