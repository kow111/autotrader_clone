import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  component: {
    // specPattern: ["cypress/components/**/*.cy.tsx", "src/**/*.cy.tsx"],
    supportFile: "cypress/support/component.ts",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:5173/",
  },
});
