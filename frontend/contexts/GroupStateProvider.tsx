import { createContext, ReactNode, useContext, useState } from 'react'
import { Group } from '../types'

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
