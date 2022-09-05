import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { TalkApp } from '../../containers/TalkApp'
import { useGroupState } from '../../contexts/GroupStateProvider'
import { expect } from '@jest/globals'

jest.mock('../../containers/TalkList')
jest.mock('../../containers/Talkroom')
jest.mock('../../components/Common/AskLogin')
jest.mock('../../containers/LoginRequired', () => ({
  LoginRequired: ({ children }: { children: ReactNode }) => <>{children}</>,
}))
jest.mock('../../contexts/GroupStateProvider')
const mockedUseGroupState = jest.mocked(useGroupState)

describe('<TalkApp />', () => {
  it('正常に描画される', async () => {
    mockedUseGroupState.mockImplementation(
      jest.fn(() => ({
        group: {
          id: 0,
        },
      })) as jest.Mock
    )

    render(<TalkApp />)

    await waitFor(() => {
      expect(mockedUseGroupState).toBeCalled()
    })
  })
})
