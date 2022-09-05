import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  useUserState,
  UserStateProvider,
} from '../../contexts/UserStateProvider'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

jest.mock('../../utils/api', () => ({
  fetchUser: () =>
    Mock.from({
      id: 0,
      name: 'Test',
    }),
}))

describe('<UserStateProvider />', () => {
  it('正常にUserをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <UserStateProvider>{children}</UserStateProvider>
    )
    const { result } = renderHook(() => useUserState(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toBe(undefined)
    })

    act(() => {
      result.current.updateUser()
    })

    await waitFor(() => {
      expect(result.current.user?.name).toBe('Test')
    })
  })
})
