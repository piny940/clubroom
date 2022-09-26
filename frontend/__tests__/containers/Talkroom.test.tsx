import { render, waitFor } from '@testing-library/react'
import { Talkroom } from '../../containers/Talkroom'
import { Talkroom as TalkroomType } from '../../resources/types'
import { fetchTalks } from '../../utils/api'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import { useUserInfo } from '../../contexts/UserInfoProvider'

jest.mock('../../contexts/UserInfoProvider')
jest.mock('../../utils/api')
jest.mock('../../components/TalkApp/Talks')
jest.mock('../../components/TalkApp/TalkForm')
const mockedFetchTalks = jest.mocked(fetchTalks)
const mockedUseUserInfo = jest.mocked(useUserInfo)

describe('<Talkroom />', () => {
  it('正常に動作する', async () => {
    mockedFetchTalks.mockImplementation(
      jest.fn(() => ({
        talks: [],
      })) as jest.Mock
    )
    mockedUseUserInfo.mockImplementation(
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
