import { render, waitFor } from '@testing-library/react'
import { NoGroupSelected } from '../../../components/GroupMenu/NoGroupSelected'
import { expect } from '@jest/globals'

describe('<NoGroupSelected />', () => {
  it('正常に描画される', async () => {
    const component = render(<NoGroupSelected />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
