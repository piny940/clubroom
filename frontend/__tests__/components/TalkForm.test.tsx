import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { TalkForm, TalkFormProps } from '../../components/TalkForm'
import { expect } from '@jest/globals'
import { TestID } from '../../resources/TestID'

jest.spyOn(HTMLFormElement.prototype, 'requestSubmit')

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

  it('Command + Enterでsubmitがクリックされる', async () => {
    const register = jest.fn()
    const onSubmit = jest.fn()
    const enabledProps: TalkFormProps = {
      name: 'Test',
      requireMessage: 'This form is required.',
      register: register,
      onSubmit: onSubmit,
    }
    const { getByTestId } = render(<TalkForm {...enabledProps} />)

    const submit = jest.fn((e) => e.preventDefault())
    getByTestId(TestID.TALK_FORM_SUBMIT).onclick = submit

    await waitFor(() => {
      expect(submit).not.toBeCalled()
    })

    act(() => {
      fireEvent.keyPress(window, {
        key: 'Enter',
        metaKey: true,
      })
    })
    await waitFor(() => {
      expect(submit).toBeCalled()
    })
  })

  it('Ctrl + Enterでsubmitがクリックされる', async () => {
    const register = jest.fn()
    const onSubmit = jest.fn()
    const enabledProps: TalkFormProps = {
      name: 'Test',
      requireMessage: 'This form is required.',
      register: register,
      onSubmit: onSubmit,
    }
    const { getByTestId } = render(<TalkForm {...enabledProps} />)

    const submit = jest.fn((e) => e.preventDefault())
    getByTestId(TestID.TALK_FORM_SUBMIT).onclick = submit

    await waitFor(() => {
      expect(submit).not.toBeCalled()
    })

    act(() => {
      fireEvent.keyPress(window, {
        key: 'Enter',
        ctrlKey: true,
      })
    })
    await waitFor(() => {
      expect(submit).toBeCalled()
    })
  })
})
