import { render } from '@testing-library/react'
import {
  AccountFormBox,
  AccountFormBoxProps,
} from '../../components/AccountFormBox'
import { TestID } from '../../resources/TestID'
import { Test } from '../testHelpers/Test'
import { expect } from '@jest/globals'

describe('<AccountFormBox />', () => {
  it('正常に描画される', async () => {
    const onSubmit = jest.fn()
    const enabledProps: AccountFormBoxProps = {
      onSubmit: onSubmit,
      title: 'Test',
      alert: '',
      submitTestID: TestID.LOGIN_SUBMIT,
      submitButtonText: 'TestSubmit',
      children: <Test />,
    }

    const component = render(<AccountFormBox {...enabledProps} />)
    expect(component).toBeTruthy()
  })
})
