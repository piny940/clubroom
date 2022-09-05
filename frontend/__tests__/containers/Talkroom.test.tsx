import { render, waitFor } from '@testing-library/react'
import { Talkroom } from '../../containers/Talkroom'
import { Talkroom as TalkroomType } from '../../types'
import { fetchTalks } from '../../utils/api'
import { expect } from '@jest/globals'
import { useUserState } from '../../contexts/UserStateProvider'
import { Mock } from 'ts-mockery'

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
    let openTalkroom = Mock.from<TalkroomType>({ id: 0 })

    const { rerender } = render(
      <Talkroom width={width} openTalkroom={openTalkroom} />
    )

    await waitFor(() => {
      expect(mockedFetchTalks).toBeCalledTimes(1)
    })

    mockedFetchTalks.mockReset()

    openTalkroom = Mock.from<TalkroomType>({ id: 1 })

    rerender(<Talkroom width={width} openTalkroom={openTalkroom} />)

    await waitFor(() => {
      expect(mockedFetchTalks).toBeCalledTimes(1)
    })

    mockedFetchTalks.mockReset()

    rerender(<Talkroom width={width} openTalkroom={undefined} />)

    await waitFor(() => {
      // openTalkroomがundefinedの時はfetchTalksは呼ばれない
      expect(mockedFetchTalks).not.toBeCalled()
    })
  })
})
