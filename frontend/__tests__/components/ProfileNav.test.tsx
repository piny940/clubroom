import { render, waitFor } from '@testing-library/react'
import { ProfileNav } from '../../components/ProfileNav'

describe('<ProfileNav />', () => {
  it('正常に描画される', async () => {
    const logout = jest.fn()

    const component = render(<ProfileNav logout={logout} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
