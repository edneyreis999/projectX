module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/js'],
  collectCoverageFrom: ['js/plugins/**/*.js', '!js/plugins/**/vendor/**', '!**/node_modules/**'],
  testMatch: ['**/js/__tests__/**/*.test.js'],
  transform: {},
  testPathIgnorePatterns: ['/node_modules/', '/css/', '/data/', '/audio/', '/effects/', '/fonts/', '/img/', '/movies/', '/save/'],
};
