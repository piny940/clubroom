import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  DropdownActionButton,
  DropdownActionButtonProps,
} from '../../components/DropdownActionButton'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<DropdownActionButton />', () => {
  it('正常に描画される', async () => {
    const handler = jest.fn()

    const props = Mock.from<DropdownActionButtonProps>({
      label: 'Test',
      handler: handler,
    })

    const { getByTestId } = render(<DropdownActionButton {...props} />)

    const el = getByTestId(TestID.DROPDOWN_ACTION_BUTTON)

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
