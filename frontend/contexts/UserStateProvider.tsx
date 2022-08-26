import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../types'

interface UserStateContextInterface {
  user: User | null
  setUser: (user: User | null) => void
}

const defaultUserStateContext: UserStateContextInterface = {
  user: null,
  setUser: (user: User | null) => undefined,
}

const UserStateContext = createContext(defaultUserStateContext)

const useUserState = () => useContext(UserStateContext)

interface UserStateProviderProps {
  children: ReactNode
}

const UserStateProvider: React.FC<UserStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const value: UserStateContextInterface = {
    user: user,
    setUser: setUser,
  }

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  )
}

export { useUserState, UserStateProvider }
