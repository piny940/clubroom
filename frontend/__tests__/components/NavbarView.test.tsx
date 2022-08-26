import { render, waitFor } from '@testing-library/react'
import { NavbarView } from '../../components/NavbarView'
import { TestID } from '../../resources/TestID'
import { Group } from '../../types'

describe('<NavbarView />', () => {
  it('正常に描画される', async () => {
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

    const logout = jest.fn()

    const setGroups = jest.fn()
    const { getAllByTestId } = render(
      <NavbarView groups={groups} setGroup={setGroups} logout={logout} />
    )

    await waitFor(() => {
      expect(getAllByTestId(TestID.DROPDOWN_ACTION_BUTTON).length).toBe(2)
    })
  })
})
