import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../contexts/AlertsStateProvider'
import { Layout } from '../components/Layout'
import { useEffect } from 'react'
import { GroupStateProvider } from '../contexts/GroupStateProvider'
import { UserStateProvider } from '../contexts/UserStateProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <AlertsStateProvider>
      <GroupStateProvider>
        <UserStateProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserStateProvider>
      </GroupStateProvider>
    </AlertsStateProvider>
  )
}

export default MyApp
