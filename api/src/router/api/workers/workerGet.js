'use strict'

const logger = require('../../../logger')
const crypto = require('../../../utils/crypto')
const UserRoles = require('../../../enums').UserRoles
const Worker = require('../../../models').Worker

/* Get a worker with a worker token.
  ARGS:
    req: (object)
      params: (object)
        encryptedParams: (string) encrypted params. Once decrypted, contains
          worker: (object)
            id: (string)
    res: (object)

  RETURN:
    none
*/
const workerRoute = (req, res) => {
  let encryptedParams = req.params.encryptedParams

  let params
  crypto
    .decrypt(encryptedParams)
    .then(decryptedParams => {
      params = JSON.parse(decryptedParams)

      return Worker
        .findOne({ _id: params.worker.id })
        .exec()
    })
    .then(worker => {
      if (worker === null) return res.sendStatus(404)
      else {
        let workerDetails = {
          worker: {
            workProfile: {
              siret: worker.workProfile.siret,
              availabilities: worker.workProfile.availabilities,
              location: worker.workProfile.location,
              rating: worker.workProfile.rating,
              missions: worker.workProfile.missions
            }
          }
        }

        return res.status(200).json(workerDetails)
      }
    })
    .catch(e => {
      logger.log('error', e)
      return res.sendStatus(400)
    })
}

/* Get a worker with an admin token.
  ARGS:
    req: (object)
      params: (object)
        encryptedParams: (string) encrypted params. Once decrypted, contains
          worker: (object)
            id: (string)
    res: (object)

  RETURN:
    none
*/
const adminRoute = (req, res) => {
  let encryptedParams = req.params.encryptedParams

  let params
  crypto
    .decrypt(encryptedParams)
    .then(decryptedParams => {
      params = JSON.parse(decryptedParams)

      return Worker
        .findOne({ _id: params.worker.id })
        .exec()
    })
    .then(worker => {
      if (worker === null) return res.sendStatus(404)
      else {
        return res.status(200).json({ worker })
      }
    })
    .catch(e => {
      logger.log('error', e)
      return res.sendStatus(400)
    })
}

/* Get a worker.
  ARGS:
    req: (object)
      params: (object)
        encryptedParams: (string) encrypted params
      token: (string)
    res: (object)

  RETURN:
    none
*/
const route = (req, res) => {
  let token = req.token

  if (token.url === UserRoles.WORKER) return workerRoute(req, res)
  else if (token.url === UserRoles.ADMIN) adminRoute(req, res)
  else return res.sendStatus(404)
}

module.exports = route
