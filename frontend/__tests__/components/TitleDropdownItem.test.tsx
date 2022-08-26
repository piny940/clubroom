import { render, waitFor } from '@testing-library/react'
import { TitleDropdownItem } from '../../components/TitleDropdownItem'
import { TestID } from '../../resources/TestID'
import { Group } from '../../types'

describe('<TitleDropdownItem />', () => {
  const group: Group = {
    id: 0,
    name: 'Test',
    created_at: new Date(),
    updated_at: new Date(),
  }

  const setGroup = jest.fn()

  it('正常に描画される', async () => {
    const { getByTestId } = render(
      <TitleDropdownItem group={group} setGroup={setGroup} />
    )
    await waitFor(() => {
      expect(getByTestId(TestID.TITLE_DROPDOWN_ITEM).textContent).toBe(
        group.name
      )
    })
  })
})
