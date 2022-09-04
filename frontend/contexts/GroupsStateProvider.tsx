import { createContext, ReactNode, useContext, useState } from 'react'
import { Group } from '../types/index'
import { fetchGroups } from '../utils/api'

interface GroupsStateContextInterface {
  groups: Group[]
  updateGroups: () => void
}

const defaultContextValue: GroupsStateContextInterface = {
  groups: [],
  updateGroups: () => undefined,
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

  const updateGroups = async () => {
    const groups = await fetchGroups()
    setGroups(groups)
  }

  const value: GroupsStateContextInterface = {
    groups,
    updateGroups,
  }

  return (
    <GroupsStateContext.Provider value={value}>
      {children}
    </GroupsStateContext.Provider>
  )
}

export { useGroupsState, GroupsStateProvider }
