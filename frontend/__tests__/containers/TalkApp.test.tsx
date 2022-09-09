import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { TalkApp } from '../../containers/TalkApp'
import { useGroupState } from '../../contexts/GroupStateProvider'
import { expect } from '@jest/globals'
import { fetchTalkrooms } from '../../utils/api'
import { TestID } from '../../resources/TestID'

jest.mock('../../containers/TalkList')
jest.mock('../../containers/Talkroom')
jest.mock('../../components/Common/AskLogin')
jest.mock('../../containers/LoginRequired', () => ({
  LoginRequired: ({ children }: { children: ReactNode }) => <>{children}</>,
}))
jest.mock('../../contexts/GroupStateProvider')
jest.mock('../../utils/api')

const mockedUseGroupState = jest.mocked(useGroupState)
const mockedFetchTalkrooms = jest.mocked(fetchTalkrooms)

describe('<TalkApp />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('groupが選択済みの時はtalkroomsを取得する', async () => {
    const groupID = 1

    mockedUseGroupState.mockImplementation(
      jest.fn(() => ({
        group: {
          id: groupID,
        },
      })) as jest.Mock
    )

    mockedFetchTalkrooms.mockImplementation(
      jest.fn((groupID: number) => [
        {
          id: 0,
          name: 'Test1',
        },
        {
          id: 1,
          name: 'Test2',
        },
      ]) as jest.Mock
    )

    render(<TalkApp />)

    await waitFor(() => {
      expect(mockedUseGroupState).toBeCalled()
      expect(mockedFetchTalkrooms).toBeCalled()
      expect(mockedFetchTalkrooms.mock.calls[0][0]).toBe(groupID)
    })
  })

  it('groupが選択されていないときはtalkroomをfetchしない', async () => {
    mockedUseGroupState.mockImplementation(
      jest.fn(() => ({
        group: undefined,
      })) as jest.Mock
    )

    mockedFetchTalkrooms.mockImplementation(
      jest.fn((groupID: number) => [
        {
          id: 0,
          name: 'Test1',
        },
        {
          id: 1,
          name: 'Test2',
        },
      ]) as jest.Mock
    )

    const { queryAllByTestId } = render(<TalkApp />)

    await waitFor(() => {
      expect(queryAllByTestId(TestID.TALK_LIST_BUTTON).length).toBe(0)
      expect(mockedUseGroupState).toBeCalled()
      expect(mockedFetchTalkrooms).not.toBeCalled()
    })
  })
})
