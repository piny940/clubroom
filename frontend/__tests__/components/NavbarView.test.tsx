import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { NavbarView } from '../../components/NavbarView'
import { Group } from '../../types'

jest.mock('../../containers/LoginRequired', () => ({
  LoginRequired: ({ children }: { children: ReactNode }) => {
    return <>{children}</>
  },
}))

describe('<NavbarView />', () => {
  it('正常に描画される', async () => {
    const groups: Group[] = []
    const setGroup = jest.fn()
    const logout = jest.fn()

    const component = render(
      <NavbarView groups={groups} setGroup={setGroup} logout={logout} />
    )

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
