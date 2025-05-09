const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{ts,js}',
    supportFile: 'cypress/support/e2e.{ts,js}',
  },
});
