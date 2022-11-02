import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  ModalMenuActionButton,
  ModalMenuActionButtonProps,
} from '../../../components/Common/ModalMenuActionButton'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'
import { TestID } from '../../../resources/TestID'

describe('<TalkroomMenuActionButton', () => {
  it('正常に動作する', async () => {
    const handler = jest.fn()

    const props = Mock.from<ModalMenuActionButtonProps>({
      handler: handler,
    })
    const { getByTestId } = render(<ModalMenuActionButton {...props} />)

    await waitFor(() => {
      expect(handler).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(TestID.TALKROOM_MENU_ACTION_BUTTON))
    })

    await waitFor(() => {
      expect(handler).toBeCalled()
    })
  })
})
