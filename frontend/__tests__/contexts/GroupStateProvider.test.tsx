import { renderHook, waitFor, act } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  GroupStateProvider,
  useGroupState,
} from '../../contexts/GroupStateProvider'
import { expect } from '@jest/globals'

describe('<GroupStateProvider />', () => {
  it('正常にgroupをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GroupStateProvider>{children}</GroupStateProvider>
    )
    const { result } = renderHook(() => useGroupState(), { wrapper })

    expect(result.current.group).toBe(undefined)

    act(() => {
      result.current.setGroup({
        name: 'Test',
        id: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })
    await waitFor(() => {
      expect(result.current.group?.name).toBe('Test')
    })
  })
})
