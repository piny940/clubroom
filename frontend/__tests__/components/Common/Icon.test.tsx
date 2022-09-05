import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { Icon, IconProps } from '../../../components/Common/Icon'
import { expect } from '@jest/globals'

describe('<Icon />', () => {
  it('正常に動作する', async () => {
    const props = Mock.from<IconProps>({
      name: 'test',
      className: 'test-class',
      color: 'rgb(0, 0, 238)',
    })

    const { getByText } = render(<Icon {...props} />)

    await waitFor(() => {
      expect(getByText(props.name)).toBeTruthy()
      expect(getByText(props.name).style.color).toBe(props.color)
      expect(getByText(props.name).classList).toContain(props.className)
    })
  })
})
