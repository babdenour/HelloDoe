const baseConfig = require('./base.config');
const reportersFactory = require('./reporters-factory');

module.exports = {
  ...baseConfig,
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts}'],
  modulePathIgnorePatterns: ['dist/', 'src/mocks'],
  coverageReporters: ['html'],
  ...reportersFactory('jest-unit.xml'),
};
