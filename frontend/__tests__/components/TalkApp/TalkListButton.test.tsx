import { act, fireEvent, render, waitFor } from '@testing-library/react'
import {
  TalkListButton,
  TalkListButtonProps,
} from '../../../components/TalkApp/TalkListButton'
import { TestID } from '../../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<TalkListButton />', () => {
  it('正常に描画される', async () => {
    const setOpenTalkroom = jest.fn()
    const setMenuTalkroom = jest.fn()

    const props = Mock.from<TalkListButtonProps>({
      setOpenTalkroom: setOpenTalkroom,
      setMenuTalkroom: setMenuTalkroom,
    })

    const { getByTestId } = render(<TalkListButton {...props} />)

    act(() => {
      fireEvent.click(getByTestId(TestID.TALK_LIST_BUTTON))
    })

    await waitFor(() => {
      expect(setOpenTalkroom).toBeCalled()
      expect(setMenuTalkroom).not.toBeCalled()
    })

    setOpenTalkroom.mockReset()
    setMenuTalkroom.mockReset()

    act(() => {
      fireEvent.click(getByTestId(TestID.TALKROOM_MENU_BUTTON))
    })

    await waitFor(() => {
      expect(setOpenTalkroom).not.toBeCalled()
      expect(setMenuTalkroom).toBeCalled()
    })
  })
})
