import { render, waitFor } from '@testing-library/react'
import { TalkRow, TalkRowProps } from '../../components/TalkRow'
import { expect } from '@jest/globals'
import { TestID } from '../../resources/TestID'

describe('<TalkRow />', () => {
  it('自分が送ったトークは正常に右側に表示される', async () => {
    const enabledProps: TalkRowProps = {
      content: 'Test',
      sentFrom: 'myself',
    }
    const { getByTestId } = render(<TalkRow {...enabledProps} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK_ROW).classList).toContain(
        'justify-content-end'
      )
    })
  })

  it('他の人が送ったトークは正常に左側に表示される', async () => {
    const enabledProps: TalkRowProps = {
      content: 'Test',
      sentFrom: 'others',
    }
    const { getByTestId } = render(<TalkRow {...enabledProps} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK_ROW).classList).toContain(
        'justify-content-start'
      )
    })
  })
})
