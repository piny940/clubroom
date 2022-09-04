import { ReactNode, useEffect } from 'react'
import { useUserState } from '../contexts/UserStateProvider'

export interface LoginRequiredProps {
  children: ReactNode
  whenNoUser?: ReactNode
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({
  children,
  whenNoUser = <></>,
}) => {
  const { user, updateUser } = useUserState()

  useEffect(() => {
    void updateUser()
  }, [])

  return user ? <>{children}</> : <>{whenNoUser}</>
}
