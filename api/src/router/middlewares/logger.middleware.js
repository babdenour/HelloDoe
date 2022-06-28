'use strict';

const uuidv4 = require('uuid/v4');
const httpContext = require('express-http-context');

const logger = require('../../logger');

/**
 * Log the incomming requests.
 * @param {object} req - The http request object
 * @param {object} res - The response object
 * @param {function} next - The function to trigger the next middleware
 */
const middleware = (req, res, next) => {
  const context = {
    id: uuidv4(),
    headers: req.headers,
    params: req.params,
    url: req.originalUrl,
    method: req.method,
  };
  httpContext.set('context', context);
  logger.log('info', 'incomming request');
  next();
};

module.exports = middleware;
