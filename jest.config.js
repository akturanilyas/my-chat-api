/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  bail: 1,
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  clearMocks: true,
};
