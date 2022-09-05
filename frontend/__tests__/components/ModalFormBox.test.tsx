import { createRef } from 'react'
import { ModalFormBox, ModalFormBoxProps } from '../../components/ModalFormBox'
import { TestID } from '../../resources/TestID'
import { Test } from '../testHelpers/Test'
import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'

describe('<ModalFormBox />', () => {
  it('正常に動作する', async () => {
    const enabledProps: ModalFormBoxProps = {
      targetID: 'test',
      children: <Test />,
      title: 'Test',
      alert: '',
      submitTestID: TestID.GROUP_FORM_SUBMIT,
      submitButtonText: '送信',
      onSubmit: jest.fn(),
      closeButtonRef: createRef(),
    }

    const component = render(<ModalFormBox {...enabledProps} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
