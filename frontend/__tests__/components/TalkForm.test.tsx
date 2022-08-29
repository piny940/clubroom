import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { TalkForm, TalkFormProps } from '../../components/TalkForm'
import { expect } from '@jest/globals'
import { TestID } from '../../resources/TestID'

describe('<TalkForm />', () => {
  it('正常に描画できる', async () => {
    const register = jest.fn()
    const name = 'Test'
    const onSubmit = jest.fn()
    const requireMessage = 'This form is required.'

    const enabledProps: TalkFormProps = {
      name: name,
      requireMessage: requireMessage,
      register: register,
      onSubmit: onSubmit,
    }

    const { getByTestId } = render(<TalkForm {...enabledProps} />)

    await waitFor(() => {
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe(name)
      expect(register.mock.calls[0][1].required).toBe(requireMessage)
    })

    act(() => {
      fireEvent.submit(getByTestId(TestID.TALK_FORM))
    })

    await waitFor(() => {
      expect(onSubmit).toBeCalledTimes(1)
    })
  })
})
