import { render, waitFor } from '@testing-library/react'
import { Talks, TalksProps } from '../../components/TalkApp/Talks'
import { Talk } from '../../types'
import { expect } from '@jest/globals'
import { TalkRow } from '../../components/TalkApp/TalkRow'
import { Mock } from 'ts-mockery'

jest.mock('../../components/TalkApp/TalkRow')
const mockedTalkRow = jest.mocked(TalkRow)

describe('<Talks />', () => {
  it('talkのfrom_user_idとpropsのuserIDから正常にmyselfとothersの割り振りがされる', async () => {
    const userID = 1

    const props = Mock.from<TalksProps>({
      userID: userID,
      talks: [
        Mock.from<Talk>({
          id: 0,
          from_user_id: userID,
        }),
        Mock.from<Talk>({
          id: 1,
          from_user_id: 2,
        }),
      ],
    })

    render(<Talks {...props} />)

    await waitFor(() => {
      expect(mockedTalkRow).toBeCalledTimes(2)
      expect(mockedTalkRow.mock.calls[0][0].sentFrom).toBe('myself')
      expect(mockedTalkRow.mock.calls[1][0].sentFrom).toBe('others')
    })
  })
})
