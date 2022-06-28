'use strict'

let Enum = {
  TO_BE_PAID_BY_CLIENT: 'TO_BE_PAID_BY_CLIENT',
  BEING_PREPARED: 'BEING_PREPARED',
  PREPARED: 'PREPARED',
  ON_GOING: 'ON_GOING',
  BEING_REVIEWED: 'BEING_REVIEWED',
  WORKERS_TO_BE_PAID: 'WORKERS_TO_BE_PAID',
  DONE: 'DONE'
}

Object.freeze(Enum)

module.exports = Enum
