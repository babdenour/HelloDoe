'use strict'

const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const tm = require('../../utils/tokenManager')
const UserRoles = require('../../enums').UserRoles

/**
* Check that the request carries a valid token and add the token to the request object.
* @param {object} req - The http request object
* @param {object} res - The response object
* @param {function} next - The function to trigger the next middleware
*/
const middleware = (roles) => {
  if (nt.isUndefined(roles) || roles.length === 0) roles = [UserRoles.ADMIN, UserRoles.CLIENT, UserRoles.WORKER]

  return (req, res, next) => {
    let authorization = nt.getProp(req, 'headers.authorization')
    if (nt.isUndefined(authorization)) {
      logger.log('error', 'missing token')
      return res.sendStatus(401)
    }

    let token = authorization.split(' ')[1]
    if (nt.isUndefined(token)) {
      logger.log('error', 'malformed authorization header', authorization)
      return res.sendStatus(400)
    }

    tm
      .decryptToken(token)
      .then(token => {
        logger.log('info', token)
        if (!roles.includes(token.url)) {
          logger.log('error', 'invalid token', token)
          return res.sendStatus(403)
        }

        req.token = token
        next()
      })
      .catch(e => {
        logger.log('error', e)
        res.sendStatus(500)
      })
  }
}

module.exports = middleware
