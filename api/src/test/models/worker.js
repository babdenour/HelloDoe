'use strict'

const AvailabilitiyType = require('../../enums').AvailabilitiyType
let Worker = require('../../models').Worker
let expect = require('chai').expect

describe('model Worker', () => {
  it('> detect a worker with regular schedule compatible with a timetable', () => {
    let timetable = {
      days: [1]
    }

    let worker = new Worker({
      workProfile: {
        availabilities: {
          type: AvailabilitiyType.REGULAR,
          timeSlots: [{ day: 1 }, { day: 2 }]
        }
      }
    })

    let expected = true

    expect(worker.isTimetableCompatible(timetable)).to.equal(expected)
  })

  it('> detect a worker with regular schedule NOT compatible with a timetable', () => {
    let timetable = {
      days: [1, 3]
    }

    let worker = new Worker({
      workProfile: {
        availabilities: {
          type: AvailabilitiyType.REGULAR,
          timeSlots: [{ day: 1 }, { day: 2 }]
        }
      }
    })

    let expected = false

    expect(worker.isTimetableCompatible(timetable)).to.equal(expected)
  })

  it('> detect a worker with flexible schedule compatible with a timetable', () => {
    let timetable = {
      dates: ['2018-07-16']
    }

    let worker = new Worker({
      workProfile: {
        availabilities: {
          type: AvailabilitiyType.FLEXIBLE,
          timeSlots: ['2018-07-16']
        }
      }
    })

    let expected = true

    expect(worker.isTimetableCompatible(timetable)).to.equal(expected)
  })

  it('> detect a worker with flexible schedule NOT compatible with a timetable', () => {
    let timetable = {
      dates: ['2018-07-16', '2018-07-17']
    }

    let worker = new Worker({
      workProfile: {
        availabilities: {
          type: AvailabilitiyType.FLEXIBLE,
          timeSlots: ['2018-07-16']
        }
      }
    })

    let expected = false

    expect(worker.isTimetableCompatible(timetable)).to.equal(expected)
  })
})
