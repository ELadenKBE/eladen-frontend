describe('Cartpage tests', () => {
  beforeEach(() => {
    // Add a cart product element to the page
    cy.document().then((doc) => {
      const cartProduct = doc.createElement('div');
      cartProduct.className = 'cart-product';
      doc.body.appendChild(cartProduct);
    });

    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/cart');
  });

  //   it('should show the correct number of products in the cart', () => {
  //     cy.get('.cart-product').should('have.length', 1);
  //   });

  //   it('should correctly update the total price ', () => {
  //     cy.get('.cart-total-text').should('contain', '€59.99');
  //   });

  it('should be able to checkout', () => {
    cy.get('.checkout-button').click();
    cy.get('.cart-total-text').should('contain', '€0.00');
  });
});
