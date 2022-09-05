import {
  ModalFormBox,
  ModalFormBoxProps,
} from '../../components/Common/ModalFormBox'
import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<ModalFormBox />', () => {
  it('正常に動作する', async () => {
    const props = Mock.all<ModalFormBoxProps>()

    const component = render(<ModalFormBox {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
