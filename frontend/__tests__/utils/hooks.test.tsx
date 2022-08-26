import { act, renderHook, waitFor } from '@testing-library/react'
import { useAlertsState } from '../../contexts/AlertsStateProvider'
import { AlertInput } from '../../types'
import { AlertState } from '../../utils/enums'
import { useMovePage } from '../../utils/hooks'

const push = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: push,
  }),
}))

jest.mock('../../contexts/AlertsStateProvider')

describe('useMovePage', () => {
  it('返り値の関数にalertを与えて実行するとalertが正常にcontextのalertsに追加される', async () => {
    const mockedUseAlertsState = jest.mocked(useAlertsState) as jest.Mock
    const setAlerts = jest.fn()
    mockedUseAlertsState.mockImplementation(() => ({
      setAlerts: setAlerts,
    }))

    const { result } = renderHook(() => useMovePage())
    const url = 'test'
    const alerts: AlertInput[] = [
      {
        content: 'Test',
        state: AlertState.DANGER,
      },
    ]

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
