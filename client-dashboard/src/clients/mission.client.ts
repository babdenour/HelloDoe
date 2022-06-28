import { BaseClient } from '@/clients/base.client';
import { FetchByCodeRsp, FetchByIdRsp } from '@/clients/mission.client-utils';
import Config from '@/config';
import { MissionConverter } from '@converters/mission.converter';
import { Mission } from '@domains/mission';
import { TokenService } from '@services/token.service';

export class MissionClient extends BaseClient {
  endpoint: string;

  constructor(private readonly missionCvtr: MissionConverter, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_MISSIONS_V2;
  }

  public async fetchByCode(code: string): Promise<Mission> {
    try {
      const res = await this.get<FetchByCodeRsp>(`${this.endpoint}code/${code}`);

      if (!res.success) {
        throw new Error();
      }

      return this.missionCvtr.toDomain(res.data);
    } catch (ex) {}

    return null;
  }

  public async fetchById(id: string): Promise<Mission> {
    try {
      const res = await this.get<FetchByIdRsp>(`${this.endpoint}${id}`);

      if (!res.success) {
        throw new Error();
      }

      return this.missionCvtr.toDomain(res.data);
    } catch (ex) {}

    return null;
  }
}
