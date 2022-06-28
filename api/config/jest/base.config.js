const moduleNameMapper = require('./moduleNameMapper');

module.exports = {
  rootDir: '../../src',
  globalSetup: '../config/jest/setup.js',
  testEnvironment: '../config/jest/test-environment.js',
  moduleNameMapper,
};
