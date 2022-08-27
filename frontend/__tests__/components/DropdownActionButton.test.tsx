import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { DropdownActionButton } from '../../components/DropdownActionButton'
import { TestID } from '../../resources/TestID'

describe('<DropdownActionButton />', () => {
  it('正常に描画される', async () => {
    const label = 'Test'
    const handler = jest.fn()

    const { getByTestId } = render(
      <DropdownActionButton label={label} handler={handler} />
    )

    const el = getByTestId(TestID.DROPDOWN_ACTION_BUTTON)

    await waitFor(() => {
      expect(el.textContent).toBe(label)
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
