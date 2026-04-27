module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  testMatch: ["<rootDir>/src/**/*.{test,spec}.{ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$": "<rootDir>/src/test/fileMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  clearMocks: true,
};
