export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    "^.+\\.tsx?$": ['ts-jest', { useESM: true }],
  },
  setupFilesAfterEnv: ["dotenv/config", "<rootDir>/jest/setup.js"],
  verbose: true,
  moduleNameMapper: {
    axios: '<rootDir>/src/__mocks__/axios.js',
  },
};