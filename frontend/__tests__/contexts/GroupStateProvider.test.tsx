import { renderHook, waitFor, act } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  GroupStateProvider,
  useGroupState,
} from '../../contexts/GroupStateProvider'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { Group } from '../../types'

describe('<GroupStateProvider />', () => {
  it('正常にgroupをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GroupStateProvider>{children}</GroupStateProvider>
    )
    const { result } = renderHook(() => useGroupState(), { wrapper })

    expect(result.current.group).toBe(undefined)

    act(() => {
      result.current.setGroup(
        Mock.from<Group>({
          name: 'Test',
          id: 0,
        })
      )
    })
    await waitFor(() => {
      expect(result.current.group?.name).toBe('Test')
    })
  })
})
