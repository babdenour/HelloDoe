import log from '../log';
import { hmacSha256 } from './crypto';

interface Token {
  unm: string; // Name of the user
  url: string; // Role of the user
  iat: number; // Issue date
}

function base64Decode(str: string): string {
  return Buffer.from(str, 'base64').toString('ascii');
}

function base64Encode(str: string): string {
  return Buffer.from(str, 'ascii').toString('base64');
}

async function decryptToken(token: string): Promise<Token> {
  const pieces = token.split('.');
  const [encodedPayload, originalSignature] = pieces;

  try {
    const signature = await hmacSha256(encodedPayload);
    if (signature === originalSignature) {
      const info = JSON.parse(base64Decode(encodedPayload));

      return info;
    } else {
      throw new Error('Token Manager: invalid token');
    }
  } catch (e) {
    log.error(e);
    throw e;
  }
}

async function generateToken({ unm, url }): Promise<string> {
  const payload: Token = {
    unm,
    url,
    iat: Date.now(),
  };

  try {
    const encodedPayload = base64Encode(JSON.stringify(payload));
    const signature = await hmacSha256(encodedPayload);
    const token = encodedPayload + '.' + signature;

    return token;
  } catch (e) {
    log.error(e);
    throw e;
  }
}

async function checkTokenValidity(token: string): Promise<boolean> {
  const pieces = token.split('.');
  const [encodedPayload, originalSignature] = pieces;

  try {
    const signature = await hmacSha256(encodedPayload);
    if (signature !== originalSignature) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    log.error(e);
    throw e;
  }
}

export { decryptToken, generateToken, checkTokenValidity };
