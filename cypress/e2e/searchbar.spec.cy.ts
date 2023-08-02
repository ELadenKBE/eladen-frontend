describe('Searchbar Component', () => {
  beforeEach(() => {
    // Visit the page with the Navbar component
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  // Checking if Searchbar is correctly rendered
  it('Searchbar renders correctly', () => {
    cy.get('.searchbar-container').should('be.visible');
  });

  // Check the functionality of the Searchbar
  it('Searchbar handles input and navigates to search results page on submit', () => {
    const searchInput = 'testinput';
    cy.get('.searchbar').type(searchInput).should('have.value', searchInput);

    cy.get('.searchbar-container').submit();

    // Check that the app has navigated to the search results page
    cy.url().should('include', `/search/${searchInput}`);
  });

  // Check the functionality of the search button
  it('Search button submits the form', () => {
    const searchInput = 'testinput';
    cy.get('.searchbar').type(searchInput).should('have.value', searchInput);

    cy.get('.searchbutton').click();

    // Check that the app has navigated to the search results page
    cy.url().should('include', `/search/${searchInput}`);
  });
});
