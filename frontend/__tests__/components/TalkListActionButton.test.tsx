import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  TalkListActionButton,
  TalkListActionButtonProps,
} from '../../components/TalkListActionButton'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'

describe('<TalkListActionButton />', () => {
  it('正常に動作する', async () => {
    const handler = jest.fn()
    const props = Mock.from<TalkListActionButtonProps>({
      testID: 'action-button',
      handler: handler,
    })

    const { getByTestId } = render(<TalkListActionButton {...props} />)

    await waitFor(() => {
      expect(handler).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(props.testID))
    })

    await waitFor(() => {
      expect(handler).toBeCalled()
    })
  })
})
