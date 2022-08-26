import { ReactNode, useEffect } from 'react'
import { User } from '../types'
import { fetchApi } from '../utils/helpers'

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
    const response = await fetchApi({
      url: '/user',
      method: 'GET',
    })
    const json = await response.json()
    user = json.data.user
  }

  useEffect(() => {
    void _updateUser()
  })

  return user === null ? <>{children}</> : <>{askLogin}</>
}
