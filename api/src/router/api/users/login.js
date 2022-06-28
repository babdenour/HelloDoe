'use strict'

const logger = require('../../../logger')
const crypto = require('../../../utils/crypto')
const tm = require('../../../utils/tokenManager')
const User = require('../../../models').User
const basic = require('../../../utils/nativeTypes')

/* Log a user in.

  PARAM
    req :(object)
      body :(object)
        username :(string)
        password :(string)
    res :(object)

  RETURN
    none
*/
const route = (req, res) => {
  let body = req.body
  if (!basic.ArePropsDefined(body, [ 'username', 'password' ])) return res.sendStatus(400)

  crypto
    .hmacSha256(body.password)
    .then(passHash => User.findOne({ username: body.username, password: passHash }))
    .then(user => {
      if (user === null) res.status(200).json({ success: false })
      else {
        tm
          .generateToken({ unm: body.username, url: user.role })
          .then(token => res.status(200).json({ success: true, token }))
      }
    })
    .catch(e => {
      logger.log('error', e)
      res.sendStatus(500)
    })
}

module.exports = route
