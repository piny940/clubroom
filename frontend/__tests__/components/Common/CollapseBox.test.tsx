import { expect } from '@jest/globals'
import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import {
  CollapseBox,
  CollapseBoxProps,
} from '../../../components/Common/CollapseBox'

describe('<CollapseBox />', () => {
  it('正常に動作する', async () => {
    const props = Mock.all<CollapseBoxProps>()

    const component = render(<CollapseBox {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
