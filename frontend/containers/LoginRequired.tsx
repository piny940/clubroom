import { ReactNode, useEffect } from 'react'
import { useUserState } from '../contexts/UserStateProvider'
import { fetchUser } from '../utils/api'

export interface LoginRequiredProps {
  children: ReactNode
  askLogin?: ReactNode
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({
  children,
  askLogin = <></>,
}) => {
  const { user, setUser } = useUserState()

  const _updateUser = async () => {
    setUser(await fetchUser())
  }

  useEffect(() => {
    void _updateUser()
  }, [])

  return user === null ? <>{askLogin}</> : <>{children}</>
}
