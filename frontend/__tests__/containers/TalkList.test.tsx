import { render, waitFor } from '@testing-library/react'
import { TalkList } from '../../containers/TalkList'
import { useGroupState } from '../../contexts/GroupStateProvider'
import { TestID } from '../../resources/TestID'
import { fetchTalkrooms } from '../../utils/api'
import { expect } from '@jest/globals'

jest.mock('../../utils/api')
jest.mock('../../contexts/GroupStateProvider')

const mockedUseGroupState = jest.mocked(useGroupState)
const mockedFetchTalkrooms = jest.mocked(fetchTalkrooms)

describe('<TalkList />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('groupが選択済みの時はtalkroomsを取得して表示する', async () => {
    const groupID = 1

    mockedUseGroupState.mockImplementation(
      jest.fn(() => {
        return {
          group: {
            id: groupID,
          },
        }
      }) as jest.Mock
    )

    mockedFetchTalkrooms.mockImplementation(
      jest.fn((groupID: number) => {
        return [
          {
            id: 0,
            name: 'Test1',
          },
          {
            id: 1,
            name: 'Test2',
          },
        ]
      }) as jest.Mock
    )

    const width = '25%'
    const setOpenTalkroom = jest.fn()

    const { getAllByTestId } = render(
      <TalkList width={width} setOpenTalkroom={setOpenTalkroom} />
    )

    await waitFor(() => {
      expect(getAllByTestId(TestID.TALK_LIST_BUTTON).length).toBe(2)
      expect(mockedUseGroupState).toBeCalled()
      expect(mockedFetchTalkrooms).toBeCalled()
      expect(mockedFetchTalkrooms.mock.calls[0][0]).toBe(groupID)
    })
  })

  it('groupが選択されていないときはtalkroomをfetchしない', async () => {
    const mockedUseGroupState = jest.mocked(useGroupState)
    mockedUseGroupState.mockImplementation(
      jest.fn(() => {
        return {
          group: undefined,
        }
      }) as jest.Mock
    )

    const mockedFetchTalkrooms = jest.mocked(fetchTalkrooms)

    const width = '25%'
    const setOpenTalkroom = jest.fn()

    const { queryAllByTestId } = render(
      <TalkList width={width} setOpenTalkroom={setOpenTalkroom} />
    )

    await waitFor(() => {
      expect(queryAllByTestId(TestID.TALK_LIST_BUTTON).length).toBe(0)
      expect(mockedUseGroupState).toBeCalled()
      expect(mockedFetchTalkrooms).not.toBeCalled()
    })
  })
})
