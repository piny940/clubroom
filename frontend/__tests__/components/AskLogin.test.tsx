import { render, waitFor } from '@testing-library/react'
import { AskLogin } from '../../components/AskLogin'
import { expect } from '@jest/globals'

describe('<AskLogin />', () => {
  it('正常に描画される', async () => {
    const component = render(<AskLogin />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
