import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { Layout } from '../components/Layout'
import { useAlertsState } from '../containers/AlertsStateProvider'
import { AlertState } from '../utils/enums'

const Home: NextPage = () => {
  const { addAlert } = useAlertsState()
  useEffect(() => {
    addAlert({
      content: 'Test',
      state: AlertState.SUCCESS,
    })
  }, [])
  return (
    <Layout>
      <Link href="/test">test</Link>
    </Layout>
  )
}

export default Home
