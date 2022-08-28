import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  TalkListButton,
  TalkListButtonProps,
} from '../../components/TalkListButton'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'

describe('<TalkListButton />', () => {
  it('正常に描画される', async () => {
    const handler = jest.fn()

    const enabledProps: TalkListButtonProps = {
      handler: handler,
      detail: 'This is a test detail',
      title: 'Test',
    }

    const { getByTestId } = render(<TalkListButton {...enabledProps} />)

    act(() => {
      fireEvent.click(getByTestId(TestID.TALK_LIST_BUTTON))
    })

    await waitFor(() => {
      expect(handler).toBeCalled()
    })
  })
})
