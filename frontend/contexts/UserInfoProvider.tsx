import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Group, User } from '../resources/types'
import { fetchGroups, fetchUser } from '../utils/api'

interface UserInfoInterface {
  groups: Group[]
  updateGroups: () => Promise<void>
  group: Group | undefined
  setGroup: (group: Group | undefined) => void
  user: User | undefined
  updateUser: () => Promise<void>
}

const defaultUserInfo: UserInfoInterface = {
  groups: [],
  updateGroups: async () => await new Promise(() => undefined),
  group: undefined,
  setGroup: () => undefined,
  user: undefined,
  updateUser: async () => await new Promise(() => undefined),
}

const UserInfoContext = createContext(defaultUserInfo)

const useUserInfo = () => useContext(UserInfoContext)

interface UserInfoProviderProps {
  children: ReactNode
}

const UserInfoProvider: React.FC<UserInfoProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [group, setGroup] = useState<Group | undefined>(undefined)
  const [groups, setGroups] = useState<Group[]>([])

  const updateUser = async () => {
    const user = await fetchUser()
    setUser(user)
  }

  const updateGroups = async () => {
    const groups = await fetchGroups()
    setGroups(groups)
  }

  useEffect(() => {
    void updateUser()
  }, [])

  useEffect(() => {
    void updateGroups()
    setGroup(undefined)
  }, [user])

  const value: UserInfoInterface = {
    group,
    setGroup,
    groups,
    updateGroups,
    user,
    updateUser,
  }

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}

export { useUserInfo, UserInfoProvider }
