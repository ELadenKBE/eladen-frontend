declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginWithKeycloak(): Chainable<Subject>;
  }
}
