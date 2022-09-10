import { act, renderHook, waitFor } from '@testing-library/react'
import { useAlerts } from '../../contexts/AlertsProvider'
import { AlertInput } from '../../types'
import { useMovePage, usePageChange } from '../../utils/hooks'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

const push = jest.fn()
const routerEventsOn = jest.fn()
const routerEventsOff = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: push,
    events: {
      on: routerEventsOn,
      off: routerEventsOff,
    },
  }),
}))

jest.mock('../../contexts/AlertsProvider')

describe('useRouter', () => {
  it('ページ遷移時に引数で与えられた関数が呼び出される', async () => {
    const handler = jest.fn()

    renderHook(() => usePageChange(handler))

    await waitFor(() => {
      expect(routerEventsOn).toBeCalled()
      expect(routerEventsOn.mock.calls[0][0]).toBe('routeChangeComplete')
      expect(routerEventsOn.mock.calls[0][1]).toBe(handler)
    })
  })
})

describe('useMovePage', () => {
  it('返り値の関数にalertを与えて実行するとalertが正常にcontextのalertsに追加される', async () => {
    const mockedUseAlerts = jest.mocked(useAlerts) as jest.Mock
    const setAlerts = jest.fn()
    mockedUseAlerts.mockImplementation(() => ({
      setAlerts: setAlerts,
    }))

    const { result } = renderHook(() => useMovePage())
    const url = 'test'
    const alerts: AlertInput[] = [Mock.all<AlertInput>()]

    await act(async () => {
      await result.current(url, ...alerts)
    })

    await waitFor(() => {
      expect(push).toBeCalled()
      expect(push.mock.calls[0][0]).toBe(url)

      expect(setAlerts).toBeCalled()
      expect(setAlerts.mock.calls[0][0]).toBe(alerts[0])
    })
  })
})
