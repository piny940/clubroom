import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Tooltip, TooltipProps } from '../../../components/Common/Tooltip'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'
import { Test } from '../../testHelpers/Test'

const mockedSetIsShown = jest.fn()
jest.mock('react', () => {
  const defaultModule = jest.requireActual('react')
  return {
    ...defaultModule,
    useState: () => [false, mockedSetIsShown],
  }
})

describe('<Tooltip />', () => {
  it('正常に動作する', async () => {
    const testID = 'test-tooltip'
    const props = Mock.from<TooltipProps>({
      children: <Test />,
      testID: testID,
    })
    const { getByTestId } = render(<Tooltip {...props} />)
    const target = getByTestId(testID).nextElementSibling

    await waitFor(() => {
      expect(mockedSetIsShown).not.toBeCalled()
      expect(target).toBeTruthy()
    })

    if (!target) return

    act(() => {
      fireEvent.mouseEnter(target)
    })

    await waitFor(() => {
      expect(mockedSetIsShown).toBeCalledTimes(1)
      expect(mockedSetIsShown.mock.calls[0][0]).toBe(true)
    })

    act(() => {
      fireEvent.mouseLeave(target)
    })

    await waitFor(() => {
      expect(mockedSetIsShown).toBeCalledTimes(2)
      expect(mockedSetIsShown.mock.calls[1][0]).toBe(false)
    })
  })
})
