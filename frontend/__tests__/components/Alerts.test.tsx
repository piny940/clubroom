import { render, waitFor } from '@testing-library/react'
import { Alerts } from '../../components/Alerts'
import { AlertState } from '../../utils/enums'
import { TestID } from '../../resources/TestID'
import { Alert } from '../../types'
import { expect } from '@jest/globals'

jest.mock('../../contexts/AlertsStateProvider', () => {
  return {
    useAlertsState(): { alerts: Alert[] } {
      return {
        alerts: [
          {
            content: 'Test1',
            state: AlertState.DANGER,
            id: 0,
          },
          {
            content: 'Test2',
            state: AlertState.NOTICE,
            id: 1,
          },
        ],
      }
    },
  }
})

describe('<Alerts />', () => {
  it('正常に描画される', async () => {
    const { getAllByTestId } = render(<Alerts />)

    await waitFor(() => {
      expect(getAllByTestId(TestID.ALERT).length).toBe(2)
      expect(getAllByTestId(TestID.ALERT)[0].classList).toContain('m-0')
      expect(getAllByTestId(TestID.ALERT)[1].classList).toContain('mt-1')
    })
  })
})
