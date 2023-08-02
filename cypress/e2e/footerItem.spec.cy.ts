describe('FooterItem component', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('should render an internal link when url is provided', () => {
    cy.get('.footer-items-container a.footer-item')
      .eq(0)
      .should('have.attr', 'href', '/cart');
  });

  it('should render an external link when url is provided and externalLink is true', () => {
    cy.get('.footer-items-container a.footer-item')
      .eq(1)
      .should('have.attr', 'href', 'https://github.com/ELadenKBE');
  });
});
