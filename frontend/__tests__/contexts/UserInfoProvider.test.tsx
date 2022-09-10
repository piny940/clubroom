import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { UserInfoProvider, useUserInfo } from '../../contexts/UserInfoProvider'
import { Group } from '../../types'

jest.mock('../../utils/api', () => ({
  fetchUser: () =>
    Mock.from({
      id: 0,
      name: 'Test',
    }),
  fetchGroups: () => [Mock.from<Group>({ id: 0 }), Mock.from<Group>({ id: 1 })],
}))

describe('<UserInfoProvider />', () => {
  it('正常にUserをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <UserInfoProvider>{children}</UserInfoProvider>
    )
    const { result } = renderHook(() => useUserInfo(), { wrapper })

    await waitFor(() => {
      expect(result.current.user).toBe(undefined)
    })

    await act(async () => {
      await result.current.updateUser()
    })

    await waitFor(() => {
      expect(result.current.user?.name).toBe('Test')
    })
  })

  it('正常にGroupsをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <UserInfoProvider>{children}</UserInfoProvider>
    )
    const { result } = renderHook(() => useUserInfo(), { wrapper })

    await waitFor(() => {
      expect(result.current.groups.length).toBe(0)
    })

    await act(async () => {
      await result.current.updateGroups()
    })

    await waitFor(() => {
      expect(result.current.groups.length).toBe(2)
    })
  })

  it('正常にgroupをsetできる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <UserInfoProvider>{children}</UserInfoProvider>
    )
    const { result } = renderHook(() => useUserInfo(), { wrapper })

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
