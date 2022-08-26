import { render } from '@testing-library/react'
import { NavbarView } from '../../components/NavbarView'
import { TestID } from '../../resources/TestID'
import { Group } from '../../types'

describe('<NavbarView />', () => {
  it('正常に描画される', () => {
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

    const setGroups = jest.fn()
    const { getAllByTestId } = render(
      <NavbarView groups={groups} setGroup={setGroups} />
    )

    expect(getAllByTestId(TestID.TITLE_DROPDOWN_ITEM).length).toBe(2)
  })
})
