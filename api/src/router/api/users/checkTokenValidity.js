'use strict'

const logger = require('../../../logger')
const tm = require('../../../utils/tokenManager')
const basic = require('../../../utils/nativeTypes')

/* Check validity of a token.

  PARAM
    req :(object)
      body :(object)
        token :(string)
    res :(object)

  RETURN
    none
*/
const route = (req, res) => {
  let body = req.body
  if (!basic.ArePropsDefined(body, [ 'token' ])) return res.sendStatus(400)

  tm
    .checkTokenValidity(body.token)
    .then(validity => {
      if (!validity) res.status(200).json({ success: false, msg: `Le token est invalide.` })
      else res.status(200).json({ success: true })
    })
    .catch(e => {
      logger.log('error', e)
      res.sendStatus(500)
    })
}

module.exports = route
