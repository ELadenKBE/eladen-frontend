describe('Landingpage tests', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('should render Sidebar', () => {
    cy.get('.sidebar').should('be.visible');
  });

  it('should have all filters in Sidebar', () => {
    cy.get('.sidebar-availability').should('be.visible');
    cy.get('.sidebar-prices').should('be.visible');
    cy.get('.sidebar-sorting').should('be.visible');
  });

  it('should render ProductFrame', () => {
    cy.get('.product-container').should('be.visible');
  });
});
