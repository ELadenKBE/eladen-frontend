describe('Product component functionality', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('Correctly shows hover effect', () => {
    cy.get('.product')
      .first()
      .trigger('mouseover', { force: true })
      .should('have.class', 'hovered');

    cy.get('.product')
      .first()
      .trigger('mouseout', { force: true })
      .should('not.have.class', 'hovered');
  });

  it('Displays Add to Cart button on hover and not added to cart', () => {
    cy.get('.product')
      .first()
      .trigger('mouseover', { force: true })
      .within(() => {
        cy.get('.add-to-cart-button').should('be.visible');
      });

    // Click the button
    cy.get('.product')
      .first()
      .find('.add-to-cart-button')
      .click({ force: true });

    // Ensure the button is not visible after the product is added to cart
    cy.get('.product')
      .first()
      .trigger('mouseover', { force: true })
      .within(() => {
        cy.get('.add-to-cart-button').should('not.exist');
      });
  });

  it('Displays correct product information', () => {
    cy.get('.product')
      .first()
      .within(() => {
        cy.get('.product-description').should('exist');
        cy.get('.product-price').should('exist');
        cy.get('.product-image').should('exist');
      });
  });
});
