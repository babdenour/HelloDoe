const { jsWithBabel: tsjPreset } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: '<rootDir>/tsconfig.unit.json',
    },
  },
  rootDir: './',
  roots: ['<rootDir>/src'],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.html(\\?style=\\..+)?$': '<rootDir>/conf/jest/vue-template-transformer.js',
  },
  testMatch: ['<rootDir>/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(png|svg|jpg)$': '<rootDir>/conf/jest/jest-ignore.js',
    '^(.+\\.html)(\\?style=\\..+)?$': '$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/conf/jest/jest-ignore.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue-tjw'],
  setupFiles: ['<rootDir>/conf/jest/polyfills.js', '<rootDir>/conf/jest/setup.jest.ts'],
  setupFilesAfterEnv: ['<rootDir>/conf/jest/setup.jest-dom.ts'],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/conf/jest/reports/coverage/jest/',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  coverageReporters: ['text', 'text-summary', 'html'],
  reporters: ['default'],
  clearMocks: true,
};
