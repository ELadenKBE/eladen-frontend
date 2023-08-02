describe('Footer component', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('should render the correct number of footer items', () => {
    // Get all footer items
    cy.get('.footer-items-container')
      .find('li.footer-item')
      .should('have.length', 2);
  });

  it('should render the correct names of footer items', () => {
    // Check the names of the footer items
    cy.get('.footer-items-container a.footer-item').eq(0).contains('Warenkorb');
    cy.get('.footer-items-container a.footer-item')
      .eq(1)
      .contains('Unser Github');
  });

  it('should have the correct links', () => {
    // Check the link of the Warenkorb item
    cy.get('.footer-items-container a.footer-item')
      .eq(0)
      .should('have.attr', 'href', '/cart');

    // Check the link of the Unser Github item
    cy.get('.footer-items-container a.footer-item')
      .eq(1)
      .should('have.attr', 'href', 'https://github.com/ELadenKBE');
  });
});
