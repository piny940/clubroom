import { render, waitFor } from '@testing-library/react'
import { TalkRow, TalkRowProps } from '../../../components/TalkApp/TalkRow'
import { expect } from '@jest/globals'
import { TestID } from '../../../resources/TestID'
import { Mock } from 'ts-mockery'

describe('<TalkRow />', () => {
  it('自分が送ったトークは正常に右側に表示される', async () => {
    const props = Mock.from<TalkRowProps>({
      sentFrom: 'myself',
    })
    const { getByTestId } = render(<TalkRow {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK_ROW).classList).toContain(
        'justify-content-end'
      )
    })
  })

  it('他の人が送ったトークは正常に左側に表示される', async () => {
    const props = Mock.from<TalkRowProps>({
      sentFrom: 'others',
    })

    const { getByTestId } = render(<TalkRow {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.TALK_ROW).classList).toContain(
        'justify-content-start'
      )
    })
  })
})
