import { render, waitFor } from '@testing-library/react'
import { Talk, TalkProps } from '../../components/Talk'
import { TestID } from '../../resources/TestID'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'
import {
  MY_TALK_COLOR,
  OTHERS_TALK_COLOR,
  TALK_BORDER_RADIUS,
} from '../../resources/constants'

describe('<Talk />', () => {
  it('sentFromがmyselfのとき、右上のみが直角になる', async () => {
    const props = Mock.from<TalkProps>({
      sentFrom: 'myself',
    })

    const { getByTestId } = render(<Talk {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK).style.borderTopRightRadius).toBe('0')
      expect(getByTestId(TestID.TALK).style.borderTopLeftRadius).toBe(
        TALK_BORDER_RADIUS
      )
      expect(getByTestId(TestID.TALK).style.backgroundColor).toBe(MY_TALK_COLOR)
    })
  })

  it('sentFromがothersのとき、左上のみが直角になる', async () => {
    const props = Mock.from<TalkProps>({
      sentFrom: 'others',
    })
    const { getByTestId } = render(<Talk {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK).style.borderTopRightRadius).toBe(
        TALK_BORDER_RADIUS
      )
      expect(getByTestId(TestID.TALK).style.borderTopLeftRadius).toBe('0')
      expect(getByTestId(TestID.TALK).style.backgroundColor).toBe(
        OTHERS_TALK_COLOR
      )
    })
  })
})
