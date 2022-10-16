import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  DropdownActionButton,
  DropdownActionButtonProps,
} from '../../../components/Common/DropdownActionButton'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<DropdownActionButton />', () => {
  it('正常に描画される', async () => {
    const handler = jest.fn()
    const testID = 'test-dropdown-action-button'

    const props = Mock.from<DropdownActionButtonProps>({
      label: 'Test',
      handler: handler,
      testID: testID,
    })

    const { getByTestId } = render(<DropdownActionButton {...props} />)

    const el = getByTestId(testID)

    await waitFor(() => {
      expect(el.textContent).toBe(props.label)
      expect(handler).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(el)
    })
    await waitFor(() => {
      expect(handler).toBeCalledTimes(1)
    })
  })
})
