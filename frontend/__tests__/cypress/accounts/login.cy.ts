import { TestID } from '../../../resources/TestID'
import {
  clickTestId,
  getTestId,
  locationShouldBe,
  typeTestId,
} from '../utils/helper'
import users from '../fixtures/users.json'

describe('accounts/login', () => {
  const LOGIN_PATH = 'accounts/login'
  const user = users.konann

  it('正常にログインできる', () => {
    cy.visit(LOGIN_PATH)
    typeTestId(TestID.LOGIN_EMAIL, user.email)
    getTestId(TestID.LOGIN_EMAIL).should('have.value', user.email)

    typeTestId(TestID.LOGIN_PASSWORD, user.password)
    getTestId(TestID.LOGIN_PASSWORD).should('have.value', user.password)

    clickTestId(TestID.LOGIN_SUBMIT)

    locationShouldBe('/')
    getTestId(TestID.ALERT).should('have.class', 'alert alert-success')
  })

  it('メールアドレスとパスワードが一致しない場合はエラーを表示する', () => {
    cy.visit(LOGIN_PATH)
    typeTestId(TestID.LOGIN_EMAIL, user.email)
    typeTestId(TestID.LOGIN_PASSWORD, 'wrongPassword')
    clickTestId(TestID.LOGIN_SUBMIT)

    locationShouldBe('/accounts/login')
    getTestId(TestID.FORM_ERROR).should('exist')
  })
})
