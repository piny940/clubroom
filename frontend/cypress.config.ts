import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: '__tests__/cypress/*.cy.{js,jsx,ts,tsx}',
    supportFile: '__tests__/cypress/support/e2e.ts',
  },
})
