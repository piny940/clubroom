import { render, waitFor } from '@testing-library/react'
import { Layout } from '../../components/Layout'
import { TestID } from '../../resources/TestID'
import { Test } from '../testHelpers/Test'

jest.mock('../../containers/Navbar.tsx', () => ({
  Navbar: () => {
    return <></>
  },
}))

describe('<Layout />', () => {
  it('正常に描画される', async () => {
    const { getByTestId } = render(
      <Layout>
        <Test />
      </Layout>
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST)).toBeTruthy()
    })
  })
})
