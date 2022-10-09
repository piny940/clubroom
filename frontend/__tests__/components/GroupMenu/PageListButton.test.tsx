import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import {
  PageListButton,
  PageListButtonProps,
} from '../../../components/GroupMenu/PageListButton'
import { expect } from '@jest/globals'
import { ReactNode } from 'react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '',
  }),
}))

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children
)

describe('<PageListButton />', () => {
  it('正常に動作する', async () => {
    const onClick = jest.fn()
    const testID = 'test-page-list-button'
    const props = Mock.from<PageListButtonProps>({
      onClick: onClick,
      testID: testID,
    })

    const { getByTestId } = render(<PageListButton {...props} />)

    await waitFor(() => {
      expect(onClick).not.toBeCalled()
    })

    act(() => {
      fireEvent.click(getByTestId(testID))
    })

    await waitFor(() => {
      expect(onClick).toBeCalled()
    })
  })
})
