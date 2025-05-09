describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login and redirect to messages', () => {
    cy.get('input[placeholder="Username"]').type('alice');
    cy.get('input[placeholder="Password"]').type('pass123');
    cy.get('button').click();
    cy.url().should('include', '/messages');
  });
});
