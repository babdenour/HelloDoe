import { Test, TestingModule } from '@nestjs/testing';

import { ServiceNames } from '../constants/service-names';
import { CryptoModule } from '../crypto.module';
import { CryptoService } from '../services/crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CryptoModule],
    }).compile();
    cryptoService = module.get<CryptoService>(ServiceNames.CRYPTO);
  });

  describe('when cipher and decipher message', () => {
    it('should cipher and decipher message', () => {
      const message = 'message';

      const ciphered = cryptoService.cipher(message);
      const deciphered = cryptoService.decipher(ciphered);

      expect(deciphered).toBe(message);
    });

    it('should raise error if decipher fails', () => {
      const indecipherable = 'message to generate an error';

      expect(() => {
        cryptoService.decipher(indecipherable);
      }).toThrowError();
    });
  });
});
