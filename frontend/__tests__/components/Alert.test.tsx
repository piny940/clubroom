import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { TestID } from '../../resources/TestID'
import { Alert as AlertType } from '../../types'
import { AlertState } from '../../utils/enums'
import { expect } from '@jest/globals'
import { Alert } from '../../components/Alert'

jest.useFakeTimers()

describe('<Alert />', () => {
  it('SuccessのAlertが正常に表示され、closeボタンで削除できる', async () => {
    const removeAlert = jest.fn()

    const alert: AlertType = {
      id: 0,
      content: 'Test',
      state: AlertState.SUCCESS,
    }
    const { getByTestId } = render(
      <Alert removeAlert={removeAlert} margin="m-0" alert={alert} />
    )

    await waitFor(() => {
      expect(getByTestId(TestID.ALERT).classList).toContain('alert')
      expect(getByTestId(TestID.ALERT).classList).toContain('alert-success')
      expect(getByTestId(TestID.ALERT).classList).toContain('m-0')
    })

    act(() => {
      fireEvent.click(getByTestId(TestID.ALERT_CLOSE))
    })

    await waitFor(() => {
      expect(removeAlert).toBeCalled()
    })
  })
  it('時間経過で正常にAlertが削除される', async () => {
    const removeAlert = jest.fn()

    const alert: AlertType = {
      id: 0,
      content: 'Test',
      state: AlertState.SUCCESS,
    }

    render(<Alert removeAlert={removeAlert} margin="m-0" alert={alert} />)

    await waitFor(() => {
      expect(removeAlert).not.toBeCalled()
    })

    jest.advanceTimersByTime(5001)

    expect(removeAlert).toBeCalled()
  })
})
