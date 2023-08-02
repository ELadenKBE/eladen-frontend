describe('Searchpage tests', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');

    // Type "gaming" in the search bar and click the search button
    cy.get('.searchbar').type('gaming');
    cy.get('.searchbutton').click();
  });

  it('should render Searchpage', () => {
    cy.get('.searchpage').should('be.visible');
  });

  it('should add a product to the cart', () => {
    cy.get('.cart-product')
      .first()
      .find('.cart-product-button')
      .click({ force: true });
    cy.visit('http://localhost:5173/cart');
    cy.get('.cart-product').should('have.length', 1);
  });

  it('should filter products based on search term ', () => {
    cy.get('.cart-product')
      .first()
      .find('.cart-product-description')
      .should('contain', 'gaming');
  });
});
