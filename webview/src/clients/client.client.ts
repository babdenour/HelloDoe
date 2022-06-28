import { BaseClient } from '@/clients/base.client';
import { FetchByIdRsp } from '@/clients/client.client-utils';
import Config from '@/config';
import { ClientConverter } from '@converters/client.converter';
import { Client } from '@domains/client';
import { TokenService } from '@services/token.service';

export class ClientClient extends BaseClient {
  endpoint: string;

  constructor(private readonly clientCvtr: ClientConverter, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_CLIENTS;
  }

  public async fetchById(id: string): Promise<Client> {
    try {
      const res = await this.get<FetchByIdRsp>(`${this.endpoint}${id}`);

      if (!res.success) {
        throw new Error();
      }

      return this.clientCvtr.toDomain(res.data);
    } catch (ex) {}

    return null;
  }
}
