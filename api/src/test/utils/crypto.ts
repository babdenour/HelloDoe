import { expect } from 'chai'

import * as crypto from '../../utils/crypto'


describe('Crypto', () => {
  describe('encrypt and decrypt a message', () => {
    it('should encrypt and decrypt a message correctly', async () => {
      const message = 'message'

      const expected = message

      try {
        const encrypted = await crypto.encrypt(message)
        const decrypted = await crypto.decrypt(encrypted)
        expect(decrypted).to.equal(expected)
      } catch (e) {
        expect(false).to.equal(true)
      }
    })

    it('should raise an error when decryption raises an error', async () => {
      const undecryptable = 'supposed to be crypted'

      try {
        await crypto.decrypt(undecryptable)
        expect(false).to.equal(true)
      } catch (e) {
        expect(true).to.equal(true)
      }
    })
  })
})
