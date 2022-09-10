import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../contexts/AlertsStateProvider'
import { Layout } from '../components/Common/Layout'
import { useEffect } from 'react'
import { GroupStateProvider } from '../contexts/GroupStateProvider'
import { UserStateProvider } from '../contexts/UserStateProvider'
import { GroupsStateProvider } from '../contexts/GroupsStateProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <AlertsStateProvider>
      <UserStateProvider>
        <GroupsStateProvider>
          <GroupStateProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GroupStateProvider>
        </GroupsStateProvider>
      </UserStateProvider>
    </AlertsStateProvider>
  )
}

export default MyApp
