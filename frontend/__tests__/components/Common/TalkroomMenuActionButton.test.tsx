import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  ModalMenuActionButton,
  ModalMenuActionButtonProps,
} from '../../../components/Common/ModalMenuActionButton'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'

describe('<TalkroomMenuActionButton', () => {
  it('正常に動作する', async () => {
    const handler = jest.fn()
    const testId = 'test-talkroom-menu^action-button'

    const props = Mock.from<ModalMenuActionButtonProps>({
      handler: handler,
      testId: testId,
    })
    const { getByTestId } = render(<ModalMenuActionButton {...props} />)

    await waitFor(() => {
      expect(handler).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(testId))
    })

    await waitFor(() => {
      expect(handler).toBeCalled()
    })
  })
})
