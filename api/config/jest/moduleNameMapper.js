const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../../tsconfig.json');

const paths = {};
Object.keys(compilerOptions.paths).map((key) => {
  const ps = compilerOptions.paths[key].map((p) =>
    p.replace('src/', ''),
  );
  paths[key] = ps;
});

module.exports = moduleNameMapper = pathsToModuleNameMapper(paths, {
  prefix: '<rootDir>/',
});
