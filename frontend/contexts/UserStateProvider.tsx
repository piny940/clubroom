import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../types'
import { fetchUser } from '../utils/api'

interface UserStateContextInterface {
  user: User | undefined
  updateUser: () => void
}

const defaultUserStateContext: UserStateContextInterface = {
  user: undefined,
  updateUser: () => undefined,
}

const UserStateContext = createContext(defaultUserStateContext)

const useUserState = () => useContext(UserStateContext)

interface UserStateProviderProps {
  children: ReactNode
}

const UserStateProvider: React.FC<UserStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const updateUser = async () => {
    const user = await fetchUser()
    setUser(user)
  }

  const value: UserStateContextInterface = {
    user,
    updateUser,
  }

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  )
}

export { useUserState, UserStateProvider }
