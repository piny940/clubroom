import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { PageList, PageListProps } from '../../../components/GroupMenu/PageList'
import { expect } from '@jest/globals'

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '',
  }),
}))

describe('<PageList />', () => {
  it('正常に動作する', async () => {
    const props = Mock.all<PageListProps>()

    const component = render(<PageList {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
