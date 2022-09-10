import { render, waitFor } from '@testing-library/react'
import { TalkList, TalkListProps } from '../../containers/TalkList'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { useUserInfo } from '../../contexts/UserInfoProvider'

jest.mock('../../contexts/UserInfoProvider')

describe('<TalkList />', () => {
  it('groupがundefinedでない時は新規トークルーム作成ボタンが表示される', async () => {
    const mockedUseUserInfo = jest.mocked(useUserInfo)
    mockedUseUserInfo.mockImplementation(
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
    const mockedUseUserInfo = jest.mocked(useUserInfo)
    mockedUseUserInfo.mockImplementation(
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
