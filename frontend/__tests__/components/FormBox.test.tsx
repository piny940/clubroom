import { render } from '@testing-library/react'
import { FormBox, FormBoxProps } from '../../components/FormBox'
import { TestID } from '../../resources/TestID'
import { Test } from '../testHelpers/Test'
import { expect } from '@jest/globals'

describe('<FormBox />', () => {
  it('正常に描画される', async () => {
    const onSubmit = jest.fn()
    const enabledProps: FormBoxProps = {
      onSubmit: onSubmit,
      title: 'Test',
      alert: '',
      submitTestID: TestID.LOGIN_SUBMIT,
      submitButtonText: 'TestSubmit',
      children: <Test />,
    }

    const component = render(<FormBox {...enabledProps} />)
    expect(component).toBeTruthy()
  })
})
