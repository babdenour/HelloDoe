import { CryptoService, InjectCryptoService } from '@crypto';
import { Injectable } from '@nestjs/common';

import { UserRole } from '../constants/user-roles';
import { TokenConverter } from '../converters/token.converter';
import { TokenFactory } from '../factories/token.factory';
import { Token } from '../models/token.model';
import { UserInfo } from '../models/user-info.model';

interface SplitToken {
  payload: string;
  payloadSignature: string;
  signature: string;
}

class InvalidTokenError extends Error {
  constructor() {
    super('Token is invalid');
    Error.captureStackTrace(this);
  }
}

@Injectable()
export class TokenService {
  constructor(@InjectCryptoService private cryptoService: CryptoService) {}

  public decipherToken = (token: string): UserInfo => {
    const { payload } = this.splitAndValidateToken(token);
    const tokenInfo: Token = JSON.parse(this.base64Decode(payload)) as Token;

    return TokenConverter.toUserInfo(tokenInfo);
  };

  public validateToken = (token: string): void => {
    this.splitAndValidateToken(token);
  };

  public generateToken = (token: Required<Pick<Token, 'unm'>> & Partial<Token>): string => {
    const payload: Token = TokenFactory.create(token);
    const encodedPayload = this.base64Encode(JSON.stringify(payload));
    const signature = this.cryptoService.hmacSha256(encodedPayload);

    return this.buildToken(encodedPayload, signature);
  };

  /**
   * Generate auth token for client.
   * @param clientId Id of the client
   * @returns Client token
   */
  public generateClientToken(clientId: string): string {
    return this.generateToken({
      unm: clientId,
      url: UserRole.CLIENT,
      iat: Date.now(),
    });
  }

  private splitAndValidateToken = (token: string): SplitToken => {
    const splitToken: SplitToken = this.splitToken(token);

    if (splitToken.signature !== splitToken.payloadSignature) {
      throw new InvalidTokenError();
    }

    return splitToken;
  };

  private buildToken = (payload: string, signature: string): string => `${payload}.${signature}`;

  private base64Decode = (str: string): string => Buffer.from(str, 'base64').toString('ascii');

  private base64Encode = (str: string): string => Buffer.from(str, 'ascii').toString('base64');

  private splitToken = (token: string): SplitToken => {
    const pieces = token.split('.');
    const [payload, signature] = pieces;
    const payloadSignature = this.cryptoService.hmacSha256(payload);
    return {
      payload,
      payloadSignature,
      signature,
    };
  };
}
