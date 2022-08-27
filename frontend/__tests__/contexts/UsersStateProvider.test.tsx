import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  useUserState,
  UserStateProvider,
} from '../../contexts/UserStateProvider'
import { expect } from '@jest/globals'

describe('<UserStateProvider />', () => {
  it('正常にUserをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <UserStateProvider>{children}</UserStateProvider>
    )
    const { result } = renderHook(() => useUserState(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toBe(null)
    })

    act(() => {
      result.current.setUser({
        id: 0,
        name: 'Test',
        kind: 'member',
        created_at: new Date(),
        updated_at: new Date(),
      })
    })

    await waitFor(() => {
      expect(result.current.user?.name).toBe('Test')
    })
  })
})
