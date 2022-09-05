import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { NavbarView, NavbarViewProps } from '../../components/NavbarView'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

jest.mock('../../containers/LoginRequired', () => ({
  LoginRequired: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

describe('<NavbarView />', () => {
  it('正常に描画される', async () => {
    const props = Mock.from<NavbarViewProps>({
      groups: [],
    })

    const component = render(<NavbarView {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
