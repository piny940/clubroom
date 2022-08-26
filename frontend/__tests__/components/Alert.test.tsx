import { render, waitFor } from '@testing-library/react'
import { Alert } from '../../components/Alert'
import { TestID } from '../../resources/TestID'
import { Alert as AlertType } from '../../types'
import { AlertState } from '../../utils/enums'

describe('<Alert />', () => {
  it('SuccessのAlertが正常に表示される', async () => {
    const alert: AlertType = {
      id: 0,
      content: 'Test',
      state: AlertState.SUCCESS,
    }
    const component = render(<Alert alert={alert} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(component.getByTestId(TestID.ALERT).classList).toContain('alert')
      expect(component.getByTestId(TestID.ALERT).classList).toContain(
        'alert-success'
      )
    })
  })
})
