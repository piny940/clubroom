import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import {
  CopyTextBox,
  CopyTextBoxProps,
} from '../../../components/Common/CopyTextBox'
import { expect } from '@jest/globals'

Object.assign(navigator, {
  clipboard: {
    writeText: () => undefined,
  },
})

describe('<CopyTextBox />', () => {
  it('正常に動作する', async () => {
    const mockedWriteOn = jest.spyOn(navigator.clipboard, 'writeText')
    const onSuccess = jest.fn()
    const testID = 'copy-text-box-test'

    const props = Mock.from<CopyTextBoxProps>({
      text: 'Test',
      onSuccess: onSuccess,
      testID: testID,
    })

    const { getByTestId } = render(<CopyTextBox {...props} />)

    await waitFor(() => {
      expect(onSuccess).not.toBeCalled()
      expect(mockedWriteOn).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(testID))
    })

    await waitFor(() => {
      expect(onSuccess).toBeCalled()
      expect(mockedWriteOn).toBeCalled()
      expect(mockedWriteOn.mock.calls[0][0]).toBe('Test')
    })
  })
})
