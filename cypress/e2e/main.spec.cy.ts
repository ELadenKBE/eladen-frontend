describe('Index.tsx tests', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('Should load the app', () => {
    // Check if the App is rendered
    cy.get('.app-container').should('be.visible');
  });
});
