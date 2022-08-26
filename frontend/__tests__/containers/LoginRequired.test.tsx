import { render, waitFor } from '@testing-library/react'
import { LoginRequired } from '../../containers/LoginRequired'
import { UserStateProvider } from '../../contexts/UserStateProvider'
import { TestID } from '../../resources/TestID'
import { fetchUser } from '../../utils/api'
import { Test } from '../testHelpers/Test'

jest.mock('../../utils/api')

describe('<LoginRequired />', () => {
  it('ログイン済みの時はchildrenを表示する', async () => {
    const mockedFetchUser = jest.mocked(fetchUser)
    mockedFetchUser.mockImplementation(
      jest.fn(async () => {
        return await Promise.resolve({
          name: 'Test',
        })
      }) as jest.Mock
    )

    const AskLogin = <Test textContent="Test2" />

    const { getByTestId } = render(
      <LoginRequired askLogin={AskLogin}>
        <Test textContent="Test1" />
      </LoginRequired>,
      { wrapper: UserStateProvider }
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST).textContent).toBe('Test1')
    })
  })
  it('ログイン済みでないときはAskLoginを表示する', async () => {
    const mockedFetchUser = jest.mocked(fetchUser)
    mockedFetchUser.mockImplementation(async () => {
      return await Promise.resolve(null)
    })

    const AskLogin = <Test textContent="Test1" />

    const { getByTestId } = render(
      <LoginRequired askLogin={AskLogin}>
        <Test textContent="Test2" />
      </LoginRequired>,
      { wrapper: UserStateProvider }
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST).textContent).toBe('Test1')
    })
  })
})
