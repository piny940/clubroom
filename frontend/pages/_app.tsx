import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsProvider } from '../contexts/AlertsProvider'
import { Layout } from '../components/Common/Layout'
import { useEffect } from 'react'
import { UserInfoProvider } from '../contexts/UserInfoProvider'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <AlertsProvider>
      <UserInfoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserInfoProvider>
    </AlertsProvider>
  )
}

export default MyApp
