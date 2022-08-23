import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../containers/AlertsStateProvider'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertsStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertsStateProvider>
  )
}

export default MyApp
