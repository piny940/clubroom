import { ReactNode } from 'react'
import { PageList } from './PageList'
import styles from '../../styles/group-menu.module.scss'

export interface BaseProps {
  children: ReactNode
}

export const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <div className="d-flex w-100" id={styles.app}>
      <PageList width="20%" />
      <div className="d-flex bg-white" style={{ width: '80%' }}>
        {children}
      </div>
    </div>
  )
}
