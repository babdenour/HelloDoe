import { expect } from 'chai'

import { generateToken, decryptToken, checkTokenValidity } from '../../utils/tokenManager'


describe('TokenManager', () => {
  it('should generate and decrypt a token', async () => {
    const tokenParams = {
      unm: 'ba',
      url: 'boo',
    }

    try {
      const token = await generateToken(tokenParams)
      const params = await decryptToken(token)
      expect(params.unm).to.equal('ba')
      expect(params.url).to.equal('boo')
    } catch (e) {
      expect(false).to.equal(true)
    }
  })

  it('should detect a valid token', async () => {
    const tokenParams = {
      unm: 'ba',
      url: 'boo',
    }

    try {
      const token = await generateToken(tokenParams)
      let isValid = await checkTokenValidity(token)
      expect(isValid).to.equal(true)

      isValid = await checkTokenValidity('invalid token')
      expect(isValid).to.equal(false)
    } catch (e) {
      expect(false).to.equal(true)
    }
  })
})
