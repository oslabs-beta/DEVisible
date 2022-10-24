/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/config/importJestDOM.ts'],
  moduleNameMapper: {
    '\\.(css|sass)$': '<rootDir>/__tests__/__mocks__/styleMock.ts',
    '^.+\\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$':
      '<rootDir>/__tests__/__mocks__/fileMock.ts',
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/config',
    '<rootDir>/dist',
  ],
  setupFiles: ['./setupTests'],
  verbose: true,
  globalSetup: '<rootDir>/__tests__/jest-setup.js',
  globalTeardown: '<rootDir>/__tests__/jest-teardown.js',
};
