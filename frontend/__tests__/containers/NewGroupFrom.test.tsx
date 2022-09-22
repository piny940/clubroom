import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { NewGroupForm } from '../../containers/NewGroupForm'
import { expect } from '@jest/globals'
import { TestID } from '../../resources/TestID'
import { postData } from '../../utils/api'
import { AlertState } from '../../utils/enums'
import { Mock } from 'ts-mockery'
import { Group } from '../../resources/types'

const setAlerts = jest.fn()
jest.mock('../../contexts/AlertsProvider', () => ({
  useAlerts: () => ({
    setAlerts: setAlerts,
  }),
}))

const updateGroups = jest.fn()
const setGroup = jest.fn()
jest.mock('../../contexts/UserInfoProvider', () => ({
  useUserInfo: () => ({
    updateGroups: updateGroups,
    setGroup: setGroup,
  }),
}))

jest.mock('../../utils/api')

describe('<NewGroupForm />', () => {
  it('正常にフォームを送信し、グループを作成できる', async () => {
    const mockedPostData = jest.mocked(postData)
    mockedPostData.mockImplementation(
      jest.fn(({ onSuccess }) => {
        onSuccess({
          data: {
            group: Mock.all<Group>(),
          },
        })
      }) as jest.Mock
    )

    const { getByTestId } = render(<NewGroupForm targetID="test" />)

    await waitFor(() => {
      expect(getByTestId(TestID.GROUP_FORM_NAME)).toBeTruthy()
      expect(getByTestId(TestID.GROUP_FORM_SCHOOL)).toBeTruthy()
      expect(getByTestId(TestID.GROUP_FORM_SUBMIT)).toBeTruthy()
    })

    act(() => {
      fireEvent.change(getByTestId(TestID.GROUP_FORM_NAME), {
        target: { value: 'TestGroup' },
      })
      fireEvent.change(getByTestId(TestID.GROUP_FORM_SCHOOL), {
        target: { value: 'TestSchool' },
      })
      fireEvent.submit(getByTestId(TestID.GROUP_FORM_SUBMIT))
    })

    await waitFor(() => {
      expect(mockedPostData).toBeCalled()
      expect(setAlerts).toBeCalled()
      expect(setAlerts.mock.calls[0][0].state).toBe(AlertState.SUCCESS)
      expect(updateGroups).toBeCalled()
      expect(setGroup).toBeCalled()
    })
  })
})
