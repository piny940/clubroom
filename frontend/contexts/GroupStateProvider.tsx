import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Group } from '../types'
import { useUserState } from './UserStateProvider'

interface GroupStateContextInterface {
  group: Group | undefined
  setGroup: (group: Group | undefined) => void
}

const defaultContextState: GroupStateContextInterface = {
  group: undefined,
  setGroup: (group: Group | undefined) => undefined,
}

const GroupStateContext = createContext(defaultContextState)

const useGroupState = () => useContext(GroupStateContext)

interface GroupStateProviderProps {
  children: ReactNode
}

const GroupStateProvider: React.FC<GroupStateProviderProps> = ({
  children,
}) => {
  const [group, setGroup] = useState<Group | undefined>(undefined)
  const { user } = useUserState()

  useEffect(() => {
    setGroup(undefined)
  }, [user])

  const value: GroupStateContextInterface = {
    group,
    setGroup,
  }

  return (
    <GroupStateContext.Provider value={value}>
      {children}
    </GroupStateContext.Provider>
  )
}

export { GroupStateProvider, useGroupState }
