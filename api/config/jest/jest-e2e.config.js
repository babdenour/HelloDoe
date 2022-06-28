const baseConfig = require('./base.config');
const reportersFactory = require('./reporters-factory');

module.exports = {
  ...baseConfig,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  ...reportersFactory('jest-e2e.xml'),
};
