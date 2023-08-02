describe('ProductFrame Component', () => {
  beforeEach(() => {
    // Visit the page with the Navbar component
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  // Check if the ProductFrame renders correctly
  it('ProductFrame renders correctly', () => {
    cy.get('.product-container').should('be.visible');
  });

  // Test the functionality of the sorting
  it('Products are sorted correctly', () => {
    // Check if the products are in the correct order
    cy.get('.product-container .product .product-price')
      .then(($prices) => {
        // Create an array of prices
        const prices = $prices
          .map((_index, html) => Cypress.$(html).text())
          .get();
        return prices;
      })
      .should('deep.eq', [
        '59.99',
        '89.99',
        '109.99',
        '129.99',
        '149.99',
        '149.99',
        '399.99',
        '499.99',
        '699.99',
      ]);
  });
});
