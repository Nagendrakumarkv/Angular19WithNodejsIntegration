# Node.js MongoDB Learning Frontend

This is the frontend for the Node.js MongoDB Learning app, built with Angular 19.

## Features

- User authentication (login)
- Real-time messaging with WebSocket
- File upload with progress feedback
- Ngrx for state management
- Karma and Jasmine for Unit testing / Cypress for e2e test

## Prerequisites

- Node.js 20.x
- Angular CLI 19.x

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend
   ```
1. Install dependencies:
   npm install

1. Run the app:  
   ng serve

1. Access at http://localhost:4200.

## Deployment

1. Build for production: ng build --configuration production

## Testing

1. Unit tests: ng test
2. E2E tests: npm run cypress:open
