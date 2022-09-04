import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  GroupsStateProvider,
  useGroupsState,
} from '../../contexts/GroupsStateProvider'
import { expect } from '@jest/globals'

jest.mock('../../utils/api', () => ({
  fetchGroups: () => [
    {
      id: 0,
      name: 'Test1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 1,
      name: 'Test2',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
}))

describe('<GroupsStateProvider />', () => {
  it('正常にGroupsをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GroupsStateProvider>{children}</GroupsStateProvider>
    )
    const { result } = renderHook(() => useGroupsState(), { wrapper })

    await waitFor(() => {
      expect(result.current.groups.length).toBe(0)
    })

    act(() => {
      result.current.updateGroups()
    })

    await waitFor(() => {
      expect(result.current.groups.length).toBe(2)
    })
  })
})
