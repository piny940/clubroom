import { render } from '@testing-library/react'
import { LoginRequired } from '../../containers/LoginRequired'
import { TestID } from '../../resources/TestID'
import { fetchUser } from '../../utils/api'
import { Test } from '../testHelpers/Test'

jest.mock('../../utils/api')

describe('<LoginRequired />', () => {
  it('ログイン済みの時は正常にchildrenを表示する', () => {
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
      </LoginRequired>
    )

    expect(getByTestId(TestID.TEST).textContent).toBe('Test1')
  })
})
