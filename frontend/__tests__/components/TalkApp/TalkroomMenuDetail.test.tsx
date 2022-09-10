import { render, waitFor } from '@testing-library/react'
import {
  TalkroomMenuDetail,
  TalkroomMenuDetailProps,
} from '../../../components/TalkApp/TalkroomMenuDetail'
import { Mock } from 'ts-mockery'
import { expect } from '@jest/globals'

describe('<TalkroomMenuDetail />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<TalkroomMenuDetailProps>()
    const component = render(<TalkroomMenuDetail {...props} />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
