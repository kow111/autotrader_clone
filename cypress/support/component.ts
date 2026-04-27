import { mount } from "cypress/react";

// Định nghĩa ngay trong file này để TypeScript bắt buộc phải nhận diện
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
