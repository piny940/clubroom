import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'
import {
  TalkroomMenuForm,
  TalkroomMenuFormProps,
} from '../../../components/TalkApp/TalkroomMenuForm'
import { act, fireEvent, render, waitFor } from '@testing-library/react'

describe('<TalkroomMenuForm />', () => {
  it('正常に動作する', async () => {
    const register = jest.fn()
    const onSubmit = jest.fn()
    const name = 'Test'
    const testID = 'talkroom-menu-form-test'

    const props = Mock.from<TalkroomMenuFormProps>({
      onSubmit: onSubmit,
      register: register,
      name: name,
      testID: testID,
    })

    const { getByTestId } = render(<TalkroomMenuForm {...props} />)

    await waitFor(() => {
      expect(register).toBeCalled()
      expect(register.mock.calls[0][0]).toBe(name)
      expect(onSubmit).not.toBeCalled()
    })

    act(() => {
      fireEvent.submit(getByTestId(testID))
    })

    await waitFor(() => {
      expect(onSubmit).toBeCalled()
    })
  })
})
