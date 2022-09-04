import { createContext, ReactNode, useContext, useState } from 'react'
import { Group } from '../types/index'

interface GroupsStateContextInterface {
  groups: Group[]
  setGroups: (...groups: Group[]) => void
}

const defaultContextValue: GroupsStateContextInterface = {
  groups: [],
  setGroups: () => undefined,
}

const GroupsStateContext = createContext(defaultContextValue)

const useGroupsState = () => useContext(GroupsStateContext)

interface GroupsStateProviderProps {
  children: ReactNode
}

const GroupsStateProvider: React.FC<GroupsStateProviderProps> = ({
  children,
}) => {
  const [groups, setGroups] = useState<Group[]>([])

  const value: GroupsStateContextInterface = {
    groups,
    setGroups: (...groups) => setGroups(groups),
  }

  return (
    <GroupsStateContext.Provider value={value}>
      {children}
    </GroupsStateContext.Provider>
  )
}

export { useGroupsState, GroupsStateProvider }
