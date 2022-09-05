import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  GroupsStateProvider,
  useGroupsState,
} from '../../contexts/GroupsStateProvider'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { Group } from '../../types'

jest.mock('../../utils/api', () => ({
  fetchGroups: () => [Mock.from<Group>({ id: 0 }), Mock.from<Group>({ id: 1 })],
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
