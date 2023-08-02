describe('App tests', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('Should render Navbar and Footer components', () => {
    // Ensure the Navbar and Footer are rendered
    cy.get('.app-container').should('be.visible');
    cy.get('.navbar').should('be.visible');
    cy.get('.footer').should('be.visible');
  });

  it('Should navigate to cart page and render Cartpage component', () => {
    cy.get('.navitem-cart').click();

    // Make sure its on the Cart page
    cy.url().should('include', '/cart');

    // Ensure the Cartpage is rendered
    cy.get('.cartpage').should('be.visible');
  });
});
