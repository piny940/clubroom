import { ReactNode } from 'react'
import { PageList } from './PageList'
import styles from '../../styles/group-menu.module.scss'
import { useUserInfo } from '../../contexts/UserInfoProvider'
import { NoGroupSelected } from './NoGroupSelected'

export interface BaseProps {
  children: ReactNode
}

export const Base: React.FC<BaseProps> = ({ children }) => {
  const { group } = useUserInfo()

  return group ? (
    <div className="d-flex w-100" id={styles.app}>
      <PageList width="20%" />
      <div className="d-flex bg-white" style={{ width: '80%' }}>
        {children}
      </div>
    </div>
  ) : (
    <NoGroupSelected />
  )
}
