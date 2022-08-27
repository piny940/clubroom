import { render, waitFor } from '@testing-library/react'
import { FormGroup, FormGroupProps } from '../../components/FormGroup'
import { expect } from '@jest/globals'

describe('<FormGroup />', () => {
  it('パスワードのFormGroupが正常に描画される', async () => {
    const register = jest.fn()

    const props: FormGroupProps = {
      label: 'Test1',
      type: 'password',
      name: 'password',
      register: register,
      testID: 'test',
    }

    const { getByTestId } = render(<FormGroup {...props} />)

    await waitFor(() => {
      expect(getByTestId('test').getAttribute('type')).toBe('password')
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe('password')
    })
  })

  it('テキストのFormGroupが正常に描画される', async () => {
    const register = jest.fn()

    const props: FormGroupProps = {
      label: 'Test2',
      type: 'text',
      name: 'test',
      register: register,
      testID: 'test',
    }

    const { getByTestId } = render(<FormGroup {...props} />)

    await waitFor(() => {
      expect(getByTestId('test').getAttribute('type')).toBe('text')
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe('test')
    })
  })
})
