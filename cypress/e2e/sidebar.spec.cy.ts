describe('Sidebar Component', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  // Check if the Sidebar renders correctly
  it('Sidebar renders correctly', () => {
    cy.get('.sidebar').should('be.visible');
  });

  // Test the functionality of the Availability checkbox
  it('Availability checkbox updates correctly', () => {
    cy.get('.sidebar-availability input[type="checkbox"]')
      .check()
      .should('be.checked');
  });

  // Test the functionality of the Sorting radio buttons
  it('Sorting radio buttons update correctly', () => {
    // Check Ascending
    cy.get('.sidebar-sorting input[value="ascending"]')
      .check()
      .should('be.checked');
    // Check Descending
    cy.get('.sidebar-sorting input[value="descending"]')
      .check()
      .should('be.checked');
  });
});
