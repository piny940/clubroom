import { render } from '@testing-library/react'
import { GroupsNav } from '../../components/Navbar/GroupsNav'
import { TestID } from '../../resources/TestID'
import { Group } from '../../types'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<GroupsNav />', () => {
  it('正常に描画される', () => {
    const setGroup = jest.fn()
    const groups: Group[] = [
      Mock.from<Group>({ id: 0 }),
      Mock.from<Group>({ id: 1 }),
    ]

    const { getAllByTestId } = render(
      <GroupsNav groups={groups} setGroup={setGroup} />
    )

    expect(getAllByTestId(TestID.DROPDOWN_ACTION_BUTTON).length).toBe(2)
  })
})
