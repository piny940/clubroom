import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { Base } from '../../../components/GroupMenu/Base'
import { LoginRequired } from '../../../containers/LoginRequired'
import { Test } from '../../testHelpers/Test'
import { expect } from '@jest/globals'

jest.mock('../../../containers/LoginRequired')
const mockedLoginRequired = jest.mocked(LoginRequired)
mockedLoginRequired.mockImplementation(
  ({ children }: { children: ReactNode }) => <>{children}</>
)

describe('<Base />', () => {
  it('正常に動作する', async () => {
    const component = render(
      <Base>
        <Test />
      </Base>
    )

    await waitFor(() => {
      expect(component).toBeTruthy()
      expect(LoginRequired).toBeCalled()
    })
  })
})
