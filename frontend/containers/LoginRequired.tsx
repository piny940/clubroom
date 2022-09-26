import { ReactNode } from 'react'
import { useUserInfo } from '../contexts/UserInfoProvider'

export interface LoginRequiredProps {
  children: ReactNode
  whenNoUser?: ReactNode
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({
  children,
  whenNoUser = <></>,
}) => {
  const { user } = useUserInfo()

  return user ? <>{children}</> : <>{whenNoUser}</>
}
