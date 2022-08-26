import Head from 'next/head'
import { ReactNode } from 'react'
import { Alerts } from './Alerts'
import styles from '../styles/layout.module.scss'
import { toClass } from '../utils/helpers'
import { Navbar } from '../containers/Navbar'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Clubroom</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={toClass('container', styles.main)}>
        <Alerts />
        {children}
      </main>
    </div>
  )
}
