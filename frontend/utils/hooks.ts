import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const usePageChange = (handler: () => void) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handler)

    return () => {
      router.events.off('routeChangeComplete', handler)
    }
  })
}
