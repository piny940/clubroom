import { render } from '@testing-library/react'
import { FormBox, FormBoxProps } from '../../../components/Common/FormBox'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<FormBox />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<FormBoxProps>()

    const component = render(<FormBox {...props} />)
    expect(component).toBeTruthy()
  })
})
