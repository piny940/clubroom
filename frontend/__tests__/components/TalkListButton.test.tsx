import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  TalkListButton,
  TalkListButtonProps,
} from '../../components/TalkListButton'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<TalkListButton />', () => {
  it('正常に描画される', async () => {
    const handler = jest.fn()

    const props = Mock.from<TalkListButtonProps>({
      handler: handler,
    })

    const { getByTestId } = render(<TalkListButton {...props} />)

    act(() => {
      fireEvent.click(getByTestId(TestID.TALK_LIST_BUTTON))
    })

    await waitFor(() => {
      expect(handler).toBeCalled()
    })
  })
})
