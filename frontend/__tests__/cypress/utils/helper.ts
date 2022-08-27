import { TestID } from '../../../resources/TestID'

export const getTestId = (testID: TestID) => {
  return cy.get(`[data-testid="${testID}"]`)
}

export const typeTestId = (testID: TestID, value: string) => {
  getTestId(testID).type(value)
}

export const clickTestId = (testID: TestID) => {
  getTestId(testID).click()
}

export const locationShouldBe = (pathName: string) => {
  cy.location('pathname').should('eq', pathName)
}
