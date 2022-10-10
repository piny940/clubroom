import { render } from '@testing-library/react'
import { GroupNavProps, GroupsNav } from '../../../components/Navbar/GroupsNav'
import { TestID } from '../../../resources/TestID'
import { Group } from '../../../resources/types'
import { expect } from '@jest/globals'
import { Mock } from 'ts-mockery'

describe('<GroupsNav />', () => {
  it('正常に描画される', () => {
    const setGroup = jest.fn()
    const groups: Group[] = [
      Mock.from<Group>({ id: 0 }),
      Mock.from<Group>({ id: 1 }),
    ]

    const props = Mock.from<GroupNavProps>({
      groups: groups,
      setGroup: setGroup,
    })

    const { getAllByTestId } = render(<GroupsNav {...props} />)

    expect(getAllByTestId(TestID.SET_GROUP_DROPDOWN_BUTTON).length).toBe(2)
  })
})
