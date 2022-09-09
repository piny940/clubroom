import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { Modal, ModalProps } from '../../../components/Common/Modal'
import { expect } from '@jest/globals'

describe('<Modal />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<ModalProps>()

    const component = render(<Modal {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
