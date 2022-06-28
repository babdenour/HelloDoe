'use strict'

let DeadlinesEnum = {
  'ASAP': 0,
  'THIS_WEEK': 1,
  'THIS_WEEK_END': 2,
  'BEFORE_END_OF_MONTH': 3
}

Object.freeze(DeadlinesEnum)

module.exports = DeadlinesEnum
