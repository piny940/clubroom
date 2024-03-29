import { render, waitFor } from '@testing-library/react'
import { InputBox, InputBoxProps } from '../../../components/Common/InputBox'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<FormGroup />', () => {
  it('パスワードのFormGroupが正常に描画される', async () => {
    const register = jest.fn()

    const props = Mock.from<InputBoxProps>({
      type: 'password',
      name: 'password',
      register: register,
      testID: 'test',
    })

    const { getByTestId } = render(<InputBox {...props} />)

    await waitFor(() => {
      expect(getByTestId(props.testID).getAttribute('type')).toBe('password')
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe('password')
    })
  })

  it('テキストのFormGroupが正常に描画される', async () => {
    const register = jest.fn()

    const props = Mock.from<InputBoxProps>({
      label: 'Test2',
      type: 'text',
      name: 'test',
      register: register,
      testID: 'test',
    })

    const { getByTestId } = render(<InputBox {...props} />)

    await waitFor(() => {
      expect(getByTestId(props.testID).getAttribute('type')).toBe('text')
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe('test')
    })
  })
})
