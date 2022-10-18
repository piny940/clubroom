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
    const onClick = jest.fn()
    const onSettingButtonClicked = jest.fn()

    const props = Mock.from<TalkListButtonProps>({
      onClick: onClick,
      onSettingButtonClicked: onSettingButtonClicked,
    })

    const { getByTestId } = render(<TalkListButton {...props} />)

    act(() => {
      fireEvent.click(getByTestId(TestID.TALK_LIST_BUTTON))
    })

    await waitFor(() => {
      expect(onClick).toBeCalled()
      expect(onSettingButtonClicked).not.toBeCalled()
    })

    onClick.mockReset()
    onSettingButtonClicked.mockReset()

    act(() => {
      fireEvent.click(getByTestId(TestID.TALKROOM_MENU_BUTTON))
    })

    await waitFor(() => {
      expect(onClick).not.toBeCalled()
      expect(onSettingButtonClicked).toBeCalled()
    })
  })
})
