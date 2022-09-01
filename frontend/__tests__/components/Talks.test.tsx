import { render, waitFor } from '@testing-library/react'
import { Talks } from '../../components/Talks'
import { Talk } from '../../types'
import { expect } from '@jest/globals'
import { TalkRow } from '../../components/TalkRow'

jest.mock('../../components/TalkRow')
const mockedGetElementById = jest.spyOn(document, 'getElementById')
const mockedScrollIntoView = jest.fn()
mockedGetElementById.mockImplementation(
  jest.fn(() => {
    return {
      scrollIntoView: mockedScrollIntoView,
    }
  }) as jest.Mock
)

describe('<Talks />', () => {
  it('talkのfrom_user_idとpropsのuserIDから正常にmyselfとothersの割り振りがされる', async () => {
    const userID = 1
    const talks: Talk[] = [
      {
        id: 0,
        from_user_id: userID,
        content: 'Test',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 1,
        from_user_id: 2,
        content: 'Test',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    const mockedTalkRow = jest.mocked(TalkRow)

    render(<Talks talks={talks} userID={userID} />)

    await waitFor(() => {
      expect(mockedTalkRow).toBeCalledTimes(2)
      expect(mockedScrollIntoView).toBeCalledTimes(1)
      expect(mockedTalkRow.mock.calls[0][0].sentFrom).toBe('myself')
      expect(mockedTalkRow.mock.calls[1][0].sentFrom).toBe('others')
    })
  })
})
