import { render } from '@testing-library/react'
import { Alerts } from '../../components/Alerts'
import { AlertState } from '../../utils/enums'
import { TestID } from '../../resources/TestID'
import { Alert } from '../../types'

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
  it('正常に描画される', () => {
    const { queryAllByTestId } = render(<Alerts />)
    expect(queryAllByTestId(TestID.ALERT).length).toBe(2)
  })
})
