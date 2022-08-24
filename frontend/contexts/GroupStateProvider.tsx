import { createContext, ReactNode, useContext, useState } from 'react'
import { Group } from '../types'

interface GroupStateContextInterface {
  group: Group | null
  setGroup: (group: Group | null) => void
}

const defaultContextState: GroupStateContextInterface = {
  group: null,
  setGroup: (group: Group | null) => undefined,
}

const GroupStateContext = createContext(defaultContextState)

const useGroupState = () => useContext(GroupStateContext)

interface GroupStateProviderProps {
  children: ReactNode
}

const GroupStateProvider: React.FC<GroupStateProviderProps> = ({
  children,
}) => {
  const [group, setGroup] = useState<Group | null>(null)

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
