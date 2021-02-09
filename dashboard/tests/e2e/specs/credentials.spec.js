const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () => {
  it('shouldGenerateApiKey', () => {
    cy.visit(APP_URL)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('john.doe@gmail.com')
    cy.get('#password-field').type('12345')
    cy.get('#submit-button').click()

    cy.wait(4000)
    cy.visit(`${APP_URL}/credentials`)
    cy.wait(2000)

    const oldApiKey = cy.get('#api-key').invoke('text')
    cy.get('#generate-api-key').click()
    cy.wait(2000)
    const newApiKey = cy.get('#api-key').invoke('text')

    expect(oldApiKey).to.not.equal(newApiKey)
  })
})