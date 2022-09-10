import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../contexts/AlertsStateProvider'
import { Layout } from '../components/Common/Layout'
import { useEffect } from 'react'
import { UserInfoProvider } from '../contexts/UserInfoProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <AlertsStateProvider>
      <UserInfoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserInfoProvider>
    </AlertsStateProvider>
  )
}

export default MyApp
