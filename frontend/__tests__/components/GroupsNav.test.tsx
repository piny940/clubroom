import { render } from '@testing-library/react'
import { GroupsNav } from '../../components/GroupsNav'
import { TestID } from '../../resources/TestID'
import { Group } from '../../types'

describe('<GroupsNav />', () => {
  it('正常に描画される', () => {
    const setGroup = jest.fn()
    const groups: Group[] = [
      {
        id: 0,
        name: 'Test1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 1,
        name: 'Test2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    const { getAllByTestId } = render(
      <GroupsNav groups={groups} setGroup={setGroup} />
    )

    expect(getAllByTestId(TestID.DROPDOWN_ACTION_BUTTON).length).toBe(2)
  })
})
