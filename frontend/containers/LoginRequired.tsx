import { ReactNode } from 'react'
import { AskLogin } from '../components/Common/AskLogin'
import { useUserInfo } from '../contexts/UserInfoProvider'

export interface LoginRequiredProps {
  children: ReactNode
  whenNoUser?: ReactNode
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({
  children,
  whenNoUser = <AskLogin />,
}) => {
  const { user } = useUserInfo()

  return user ? <>{children}</> : <>{whenNoUser}</>
}
