import { ReactNode } from 'react'
import { PageList } from './PageList'
import styles from '../../styles/group-menu.module.scss'

export interface BaseProps {
  children: ReactNode
}

export const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <div className="d-flex w-100" id={styles.app}>
      <PageList width="25%" />
      <div className="d-flex w-75 bg-white">{children}</div>
    </div>
  )
}
