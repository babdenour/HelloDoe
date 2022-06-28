import { ConfigService } from '@config';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly key: string;

  constructor(private configService: ConfigService) {
    this.key = this.configService.get<string>('CRYPTO_KEY');
  }

  public cipher = (message: string): string => {
    const cipher = crypto.createCipher('aes192', this.key);
    let ciphered = cipher.update(message, 'utf8', 'hex');
    ciphered += cipher.final('hex');

    return ciphered;
  };

  public decipher = (message: string): string => {
    const decipher = crypto.createDecipher('aes192', this.key);
    let deciphered = '';
    deciphered = decipher.update(message, 'hex', 'utf8');
    deciphered += decipher.final('utf8');

    return deciphered;
  };

  public hmacSha256 = (message: string): string => {
    const hmac = crypto.createHmac('sha256', this.key);
    hmac.update(message);
    return hmac.digest('hex');
  };
}
