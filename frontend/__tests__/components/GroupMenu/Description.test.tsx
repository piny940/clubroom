import { render, waitFor } from '@testing-library/react'
import {
  Description,
  DescriptionProps,
} from '../../../components/GroupMenu/Description'
import { TestID } from '../../../resources/TestID'
import { Test } from '../../testHelpers/Test'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<Description />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<DescriptionProps>()

    const { getByTestId } = render(
      <Description {...props}>
        <Test />
      </Description>
    )

    await waitFor(() => {
      expect(getByTestId(TestID.TEST)).toBeTruthy()
    })
  })
})
