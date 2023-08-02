describe('Navbar Component', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  // Checking if navbar is correctly rendered
  it('Navbar renders correctly', () => {
    cy.get('.navbar').should('be.visible');
    cy.get('.navitem-searchbar').should('be.visible');
    cy.get('.navitem-cart').should('be.visible');
  });

  // Check the functionality of the cart nav item
  it('Cart nav item redirects to /cart', () => {
    cy.get('.navitem-cart').click();
    cy.url().should('include', '/cart');
  });
});
