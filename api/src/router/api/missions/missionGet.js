'use strict';

const logger = require('../../../logger');
const crypto = require('../../../utils/crypto');
const UserRoles = require('../../../enums').UserRoles;
const Mission = require('../../../models').Mission;

/* Get the details of a mission.
  ARGS:
    req: (object)
      params: (object)
        encryptedParams: (string) encrypted params. Once decrypted, contains
          mission: (object)
            id: (string)
          worker: (object)
            id: (string)
    res: (object)

  RETURN:
    none
*/
const workerRoute = (req, res) => {
  let encryptedParams = req.params.encryptedParams;

  let params;
  crypto
    .decrypt(encryptedParams)
    .then((decryptedParams) => {
      params = JSON.parse(decryptedParams);

      return Mission.findOne({ _id: params.mission.id })
        .populate('clientId', 'companyName')
        .exec();
    })
    .then((mission) => {
      if (mission === null) return res.sendStatus(404);
      else {
        let missionDetails = {
          client: {
            companyName: mission.clientId.companyName,
          },
          mission: {
            amount: mission.amount,
            district: mission.district,
            category: mission.category,
            dates: mission.dates,
            address: mission.address,
            code: mission.code,
            description: mission.description,
            img: mission.img,
          },
          worker: {
            applied: mission.isApplicant(params.worker.id),
            hired: mission.isHired(params.worker.id),
          },
        };

        return res.status(200).json(missionDetails);
      }
    })
    .catch((e) => {
      logger.log('error', e);
      return res.sendStatus(400);
    });
};

/* Get the details of a mission.
  ARGS:
    req: (object)
      params: (object)
        encryptedParams: (string) encrypted params
    res: (object)

  RETURN:
    none
*/
const route = (req, res) => {
  let token = req.token;

  if (token.url === UserRoles.WORKER) return workerRoute(req, res);
  else {
    let params = req.params;

    Mission.findOne({ _id: params.encryptedParams })
      .populate('clientId')
      .exec()
      .then((mission) => {
        if (mission === null) {
          res.sendStatus(404);
        } else {
          return res.status(200).json({
            client: {
              company: mission.clientId.companyName,
              siren: mission.clientId.siren,
              address: mission.clientId.address,
              contact: mission.clientId.contact,
            },
            mission: {
              code: mission.code,
              description: mission.description,
              address: mission.address,
              district: mission.district,
              category: mission.category,
              dates: mission.dates,
              nbWorkers: mission.nbWorkers,
              status: mission.status,
              amount: mission.amount,
              reviews: mission.reviews,
            },
          });
        }
      })
      .catch((e) => {
        logger.log('error', e);
        return res.sendStatus(500);
      });
  }
};

module.exports = route;
