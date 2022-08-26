import { ReactNode, useEffect } from 'react'
import { User } from '../types'
import { fetchUser } from '../utils/api'

export interface LoginRequiredProps {
  children: ReactNode
  askLogin?: ReactNode
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({
  children,
  askLogin = <></>,
}) => {
  let user: User | null = null

  const _updateUser = async () => {
    user = await fetchUser()
  }

  useEffect(() => {
    void _updateUser()
  })

  return user === null ? <>{children}</> : <>{askLogin}</>
}
