import { render, waitFor } from '@testing-library/react'
import {
  ProfileNav,
  ProfileNavProps,
} from '../../../components/Navbar/ProfileNav'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

jest.mock('next/image')

describe('<ProfileNav />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<ProfileNavProps>()

    const component = render(<ProfileNav {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
