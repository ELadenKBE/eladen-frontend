//import Register from '../../src/components/Register/Register';

describe('Register component functionality', () => {
  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('http://localhost:5173/');
  });

  it('Mount register component', () => {
    // Mount the Register component
    // cy.mount(<Register onRegistrationComplete={cy.stub()} subToken="test" />);
  });
});
