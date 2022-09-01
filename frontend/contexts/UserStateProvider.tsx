import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../types'

interface UserStateContextInterface {
  user: User | undefined
  setUser: (user: User | undefined) => void
}

const defaultUserStateContext: UserStateContextInterface = {
  user: undefined,
  setUser: (user: User | undefined) => undefined,
}

const UserStateContext = createContext(defaultUserStateContext)

const useUserState = () => useContext(UserStateContext)

interface UserStateProviderProps {
  children: ReactNode
}

const UserStateProvider: React.FC<UserStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)

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
