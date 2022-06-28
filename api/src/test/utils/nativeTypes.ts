import { expect } from 'chai'

import * as nativeTypes from '../../utils/nativeTypes'


describe('NativeTypes', () => {
  describe('check properties of an object', () => {
    it('should find a deep property in an object', () => {
      const obj = {
        a: {
          b: {
            c: true
          }
        }
      }
      const props = 'a.b.c'

      const expected = true
      expect(nativeTypes.IsPropDefined(obj, props)).to.equal(expected)
    })

    it('should not find a deep property in an object', () => {
      const obj = {
        a: {
          b: {
            c: true
          }
        }
      }
      const props = 'a.b.c.d'

      const expected = false
      expect(nativeTypes.IsPropDefined(obj, props)).to.equal(expected)
    })

    it('should find a property described by a string', () => {
      const obj = { a: true }
      const props = 'a'

      const expected = true
      expect(nativeTypes.ArePropsDefined(obj, props)).to.equal(expected)
    })

    it('should find a properties described by an array', () => {
      const obj = { a: true, b: true, c: { c: true } }
      const props = ['a', 'b', 'c.c']

      const expected = true
      expect(nativeTypes.ArePropsDefined(obj, props)).to.equal(expected)
    })

    it('should not find a property in an array', () => {
      const obj = { a: true, b: true, c: { c: true } }
      const props = ['a', 'b', 'c.d']

      const expected = false
      expect(nativeTypes.ArePropsDefined(obj, props)).to.equal(expected)
    })
  })

  describe('getProp', () => {
    it('should not find a property described by a string', () => {
      const obj = { a: true }
      const path = 'b'

      expect(nativeTypes.getProp(obj, path)).to.equal(undefined)
    })

    it('should not find a property described by a string', () => {
      const obj = { a: true }
      const path = 'a.b'

      expect(nativeTypes.getProp(obj, path)).to.equal(undefined)
    })

    it('should find a property described by a string', () => {
      const obj = { a: true }
      const path = 'a'

      const expected = true
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })

    it('should find a property described by a string', () => {
      const obj = { a: { b: true } }
      const path = 'a.b'

      const expected = true
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })
  })

  describe('findMinDate', () => {
    it('should return undefined for empty array', () => {
      const dates = []

      const minDate = nativeTypes.findMinDate(dates)
      expect(minDate).to.equal(null)
    })

    it('should return a Date object for non empty array', () => {
      const dates = [new Date('1980-01-01T00:00')]

      const minDate = nativeTypes.findMinDate(dates)
      expect(Object.prototype.toString.call(minDate)).to.equal('[object Date]')
    })

    it('should find the max date of an array of dates', () => {
      const dates = [
        new Date('1982-01-01T00:00:00.000Z'),
        new Date('1980-01-01T00:00:00.000Z'),
        new Date('1990-01-01T00:00:00.000Z'),
        new Date('1985-01-01T00:00:00.000Z')
      ]

      expect(nativeTypes.findMinDate(dates).toISOString()).to.equal('1980-01-01T00:00:00.000Z')
    })
  })

  describe('findMaxDate', () => {
    it('should return undefined for empty array', () => {
      const dates = []

      const maxDate = nativeTypes.findMaxDate(dates)
      expect(maxDate).to.equal(null)
    })

    it('should return a Date object for non empty array', () => {
      const dates = [new Date('1980-01-01T00:00')]

      const maxDate = nativeTypes.findMaxDate(dates)
      expect(Object.prototype.toString.call(maxDate)).to.equal('[object Date]')
    })

    it('should find the max date of an array of dates', () => {
      const dates = [
        new Date('1980-01-01T00:00:00.000Z'),
        new Date('1990-01-01T00:00:00.000Z'),
        new Date('1985-01-01T00:00:00.000Z')
      ]

      expect(nativeTypes.findMaxDate(dates).toISOString()).to.equal('1990-01-01T00:00:00.000Z')
    })
  })
})
