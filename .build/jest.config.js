module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["<rootDir>/src/**/__tests__/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
  collectCoverage: true,
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  }
};
