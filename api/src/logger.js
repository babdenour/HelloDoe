'use strict';

const httpContext = require('express-http-context');

import baseLogger from './log';

const getContext = () => {
  return { context: httpContext.get('context') };
};

const logger = {
  log: (level, ...restArgs) => {
    baseLogger.log(level, ...restArgs, getContext());
  },
  info: (...restArgs) => {
    baseLogger.info(...restArgs, getContext());
  },
  warn: (...restArgs) => {
    baseLogger.warn(...restArgs, getContext());
  },
  error: (...restArgs) => {
    baseLogger.error(...restArgs, getContext());
  },
};

module.exports = logger;
