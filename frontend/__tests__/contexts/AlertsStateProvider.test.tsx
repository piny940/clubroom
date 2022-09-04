import { renderHook, waitFor, act } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  AlertsStateProvider,
  useAlertsState,
} from '../../contexts/AlertsStateProvider'
import { AlertState } from '../../utils/enums'
import { expect } from '@jest/globals'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    },
  }
})

describe('<AlertStateProvider />', () => {
  it('addAlert, removeAlert, setAlertが正常に動作する', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AlertsStateProvider>{children}</AlertsStateProvider>
    )
    const { result } = renderHook(() => useAlertsState(), { wrapper })

    await waitFor(() => {
      expect(result.current.alerts.length).toBe(0)
    })

    // Test for setAlert
    act(() => {
      result.current.setAlerts(
        {
          content: 'Test0',
          state: AlertState.DANGER,
        },
        {
          content: 'Test1',
          state: AlertState.NOTICE,
        }
      )
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(2)
      expect(result.current.alerts[0].id).toBe(0)
    })

    // Test for addAlert
    act(() => {
      result.current.addAlert({
        content: 'Test2',
        state: AlertState.NOTICE,
      })
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(3)
      expect(result.current.alerts[2].content).toBe('Test2')
      expect(result.current.alerts[2].id).toBe(2)
    })

    // Test for removeAlert
    act(() => {
      const alertToRemove = result.current.alerts[1]
      result.current.removeAlert(alertToRemove.id)
    })
    await waitFor(() => {
      expect(result.current.alerts.length).toBe(2)
      expect(result.current.alerts[1].content).toBe('Test2')
    })
  })
})
