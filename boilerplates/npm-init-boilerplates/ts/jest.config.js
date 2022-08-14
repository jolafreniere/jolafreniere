test;
module.exports = {
  collectCoverageFrom: [
    'index.ts',
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!<rootDir>/node_modules/'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
