import { render, waitFor } from '@testing-library/react'
import { LoginRequired } from '../../containers/LoginRequired'
import { TestID } from '../../resources/TestID'
import { fetchUser } from '../../utils/api'
import { Test } from '../testHelpers/Test'
import { expect } from '@jest/globals'
import { UserInfoProvider } from '../../contexts/UserInfoProvider'

jest.mock('../../utils/api')

describe('<LoginRequired />', () => {
  it('ログイン済みの時はchildrenを表示する', async () => {
    const mockedFetchUser = jest.mocked(fetchUser)
    mockedFetchUser.mockImplementation(
      jest.fn(() => ({
        name: 'Test',
      })) as jest.Mock
    )

    const AskLogin = <Test textContent="Test2" />

    const { getByTestId } = render(
      <LoginRequired whenNoUser={AskLogin}>
        <Test textContent="Test1" />
      </LoginRequired>,
      { wrapper: UserInfoProvider }
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST).textContent).toBe('Test1')
    })
  })
  it('ログイン済みでないときはAskLoginを表示する', async () => {
    const mockedFetchUser = jest.mocked(fetchUser)
    mockedFetchUser.mockImplementation(jest.fn(() => undefined) as jest.Mock)

    const AskLogin = <Test textContent="Test1" />

    const { getByTestId } = render(
      <LoginRequired whenNoUser={AskLogin}>
        <Test textContent="Test2" />
      </LoginRequired>,
      { wrapper: UserInfoProvider }
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST).textContent).toBe('Test1')
    })
  })
})
