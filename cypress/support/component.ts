// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// Here you can put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import "@cypress/code-coverage/support";

import { mount } from 'cypress/react18';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount);

// example use:
// cy.mount(<MyComponent />)