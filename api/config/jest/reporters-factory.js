module.exports = function (outputFileName) {
  return {
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: 'reports/',
          outputName: outputFileName,
          ancestorSeparator: ' › ',
        },
      ],
    ],
  };
};
