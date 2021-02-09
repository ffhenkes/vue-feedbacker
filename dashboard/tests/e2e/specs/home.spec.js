const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('shouldRenderCreateAccountModalByCta', () => {
    cy.visit(APP_URL)
    cy.get('#cta-create-account-button').click()

    cy.get('#modal-create-account')
  })

  it('shouldRenderCreateAccountModalByHeader', () => {
    cy.visit(APP_URL)
    cy.get('#header-create-account-button').click()

    cy.get('#modal-create-account')
  })

  it('shouldRenderLoginModalByHeader', () => {
    cy.visit(APP_URL)
    cy.get('#header-login-button').click()

    cy.get('#modal-login')
  })

  it('shouldLoginWithEmailAndPassword', () => {
    cy.visit(APP_URL)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('john.doe@gmail.com')
    cy.get('#password-field').type('12345')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
  })

  it('shouldValidateEmail', () => {
    cy.visit(APP_URL)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('john.doe@')
    cy.get('#password-field').type('12345')
    cy.get('#submit-button').click()
    cy.get('#email-error')
  })

  it('shouldLogout', () => {
    cy.visit(APP_URL)
    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('john.doe@gmail.com')
    cy.get('#password-field').type('12345')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
    cy.get('#logout-button').click()

    cy.url().should('include', '/')
  })  
})