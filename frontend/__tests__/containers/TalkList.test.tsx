import { render, waitFor } from '@testing-library/react'
import { TalkList, TalkListProps } from '../../containers/TalkList'
import { useGroupState } from '../../contexts/GroupStateProvider'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

jest.mock('../../contexts/GroupStateProvider')

describe('<TalkList />', () => {
  it('groupがundefinedでない時は新規トークルーム作成ボタンが表示される', async () => {
    const mockedUseGroupState = jest.mocked(useGroupState)
    mockedUseGroupState.mockImplementation(
      jest.fn(() => ({
        group: {
          id: 0,
        },
      })) as jest.Mock
    )

    const props = Mock.from<TalkListProps>({
      talkrooms: [{ id: 0 }, { id: 1 }],
    })

    const { getByTestId } = render(<TalkList {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.NEW_TALKROOM_BUTTON)).toBeTruthy()
    })
  })

  it('groupがundefinedの時は新規トークルーム作成ボタンが表示されない', async () => {
    const mockedUseGroupState = jest.mocked(useGroupState)
    mockedUseGroupState.mockImplementation(
      jest.fn(() => ({
        group: undefined,
      })) as jest.Mock
    )

    const props = Mock.all<TalkListProps>()
    const { queryByTestId } = render(<TalkList {...props} />)

    await waitFor(() => {
      expect(queryByTestId(TestID.NEW_TALKROOM_BUTTON)).toBeFalsy()
    })
  })
})
