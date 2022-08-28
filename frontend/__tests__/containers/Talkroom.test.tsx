import { render, waitFor } from '@testing-library/react'
import { Talkroom } from '../../containers/Talkroom'
import { Talkroom as TalkroomType } from '../../types'
import { fetchTalks } from '../../utils/api'
import { expect } from '@jest/globals'
import { useUserState } from '../../contexts/UserStateProvider'

jest.mock('../../contexts/UserStateProvider')
jest.mock('../../utils/api')
jest.mock('../../components/Talks')
jest.mock('../../components/TalkForm')
const mockedFetchTalks = jest.mocked(fetchTalks)
const mockedUseUserState = jest.mocked(useUserState)

describe('<Talkroom />', () => {
  it('正常に動作する', async () => {
    mockedFetchTalks.mockImplementation(
      jest.fn(() => ({
        talks: [],
      })) as jest.Mock
    )
    mockedUseUserState.mockImplementation(
      jest.fn(() => ({
        user: {
          id: 0,
        },
      })) as jest.Mock
    )

    const width = '75%'
    let openTalkroom: TalkroomType = {
      id: 0,
      name: 'Test0',
      created_at: new Date(),
      updated_at: new Date(),
      kind: 'group',
      group_id: 0,
    }

    const { rerender } = render(
      <Talkroom width={width} openTalkroom={openTalkroom} />
    )

    await waitFor(() => {
      expect(mockedFetchTalks).toBeCalledTimes(1)
    })

    openTalkroom = {
      id: 1,
      name: 'Test1',
      created_at: new Date(),
      updated_at: new Date(),
      kind: 'group',
      group_id: 0,
    }

    rerender(<Talkroom width={width} openTalkroom={openTalkroom} />)

    await waitFor(() => {
      expect(mockedFetchTalks).toBeCalledTimes(2)
    })

    rerender(<Talkroom width={width} openTalkroom={null} />)

    await waitFor(() => {
      // openTalkroomがnullの時はfetchTalksは呼ばれない
      expect(mockedFetchTalks).toBeCalledTimes(2)
    })
  })
})
