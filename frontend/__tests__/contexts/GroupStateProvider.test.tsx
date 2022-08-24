import { renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'
import {
  GroupStateProvider,
  useGroupState,
} from '../../contexts/GroupStateProvider'

describe('<GroupStateProvider />', () => {
  it('正常にgroupをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <GroupStateProvider>{children}</GroupStateProvider>
    )
    const { result } = renderHook(() => useGroupState(), { wrapper })

    expect(result.current.group).toBe(null)

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
