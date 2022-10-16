import { render, waitFor } from '@testing-library/react'
import {
  DetailDescription,
  DetailDescriptionProps,
} from '../../../components/Common/DetailDescription'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'

describe('<DetailDescription />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<DetailDescriptionProps>()

    const component = render(<DetailDescription {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
