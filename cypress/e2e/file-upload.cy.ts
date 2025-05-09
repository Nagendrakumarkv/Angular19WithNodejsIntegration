describe('File Upload Flow', () => {
  beforeEach(() => {
    // Log in first (assumes login stores JWT in localStorage)
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').type('alice');
    cy.get('input[placeholder="Password"]').type('pass123');
    cy.get('button').click();
    cy.url().should('include', '/messages');
    cy.visit('/upload');
  });

  it('should upload a file and show success message', () => {
    // Debug: Check if token exists in localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      console.log('Token in localStorage:', token);
      expect(token).to.not.be.null;
    });

    const fileName = 'test.txt';
    cy.fixture('test.txt', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName,
          mimeType: 'text/plain',
        });
      });
    cy.get('button').contains('Upload').click();
    cy.get('p').should('contain', 'Upload successful!');
  });
});
