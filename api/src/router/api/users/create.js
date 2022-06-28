'use strict'

const logger = require('../../../logger')
const crypto = require('../../../utils/crypto')
const User = require('../../../models').User
const basic = require('../../../utils/nativeTypes')

/* Create a user.

  PARAM
    req :(object)
      body :(object)
        username :(string)
        password :(string)
        role: (string)
    res :(object)

  RETURN
    none
*/
const route = (req, res) => {
  let body = req.body
  if (!basic.ArePropsDefined(body, [ 'username', 'password' ])) return res.sendStatus(400)

  User
    .findOne({ username: body.username })
    .then(user => {
      if (user !== null) res.status(200).json({success: false, msg: `L'utilisateur existe déjà`})
      else {
        crypto
          .hmacSha256(body.password)
          .then(passHash => {
            body.password = passHash
            return new User(body).save()
          })
          .then(() => res.sendStatus(200))
          .catch(err => {
            res.sendStatus(500)
            logger.log('error', err)
          })
      }
    })
    .catch(err => {
      res.sendStatus(500)
      logger.log('error', err)
    })
}

module.exports = route
