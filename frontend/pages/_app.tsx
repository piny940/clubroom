import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AlertsStateProvider } from '../containers/AlertsStateProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertsStateProvider>
      <Component {...pageProps} />
    </AlertsStateProvider>
  )
}

export default MyApp
