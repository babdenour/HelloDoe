import * as crypto from 'crypto';

import * as config from '../configs/config';
import log from '../log';

function encrypt(message: string): Promise<string> {
  return new Promise((resolve) => {
    const cipher = crypto.createCipher('aes192', config.CRYPTO_KEY);
    let encrypted = '';
    cipher.on('readable', () => {
      const data = cipher.read();
      if (data) encrypted += (data as Buffer).toString('hex');
    });
    cipher.on('end', () => {
      resolve(encrypted);
    });

    cipher.write(message);
    cipher.end();
  });
}

function decrypt(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const decipher = crypto.createDecipher('aes192', config.CRYPTO_KEY);

    let decrypted = '';
    decipher.on('readable', () => {
      const data = decipher.read();
      if (data) decrypted += (data as Buffer).toString('ascii');
    });
    decipher.on('end', () => {
      resolve(decrypted);
    });

    try {
      decipher.write(message, 'hex');
      decipher.end();
    } catch (e) {
      log.log('error', e);
      reject(e);
    }
  });
}

function hmacSha256(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hmac = crypto.createHmac('sha256', config.CRYPTO_KEY);

    let hash = '';
    hmac.on('readable', () => {
      const data = hmac.read();
      if (data) hash += (data as Buffer).toString('hex');
    });
    hmac.on('end', () => {
      resolve(hash);
    });

    hmac.write(message);
    hmac.end();
  });
}

export { encrypt, decrypt, hmacSha256 };
