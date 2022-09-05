import { render, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import {
  MaterialIcon,
  MaterialIconProps,
} from '../../../components/Common/MaterialIcon'
import { expect } from '@jest/globals'

describe('<Icon />', () => {
  it('正常に動作する', async () => {
    const props = Mock.from<MaterialIconProps>({
      name: 'test',
      className: 'test-class',
      color: 'rgb(0, 0, 238)',
    })

    const { getByText } = render(<MaterialIcon {...props} />)

    await waitFor(() => {
      expect(getByText(props.name)).toBeTruthy()
      expect(getByText(props.name).style.color).toBe(props.color)
      expect(getByText(props.name).classList).toContain(props.className)
    })
  })
})
