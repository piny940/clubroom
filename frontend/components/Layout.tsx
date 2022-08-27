import Head from 'next/head'
import { ReactNode } from 'react'
import { Alerts } from './Alerts'
import { Navbar } from '../containers/Navbar'
import styles from '../styles/layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Clubroom</title>
      </Head>
      <header id={styles.header}>
        <Navbar />
      </header>
      <main>
        <Alerts />
        {children}
      </main>
    </div>
  )
}
