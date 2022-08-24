import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../containers/AlertsStateProvider'
import { Layout } from '../components/Layout'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <AlertsStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertsStateProvider>
  )
}

export default MyApp
