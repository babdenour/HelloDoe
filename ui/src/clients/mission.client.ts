import { BaseClient } from '@/clients/base.client';
import { GetByCodeRsp, GetCandidatePageRsp, GetFavoriteDoersCountRsp } from '@/clients/mission.client-utils';
import Config from '@/config';
import { MissionInterface } from '@/types/mission.interface';
import { CandidateConverter } from '@converters/candidate.converter';
import { Candidate } from '@domains/candidate';
import { TokenService } from '@services/token.service';

export class MissionClient extends BaseClient {
  endpoint: string;

  constructor(private readonly candidateCvtr: CandidateConverter, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_MISSIONS_V2;
  }

  public async getByCode(code: string): Promise<MissionInterface> {
    try {
      const res: GetByCodeRsp = await this.get(`${this.endpoint}code/${code}`);

      if (!res.success) {
        throw new Error();
      }

      return res.data;
    } catch (ex) {}

    return null;
  }

  public async getCandidatePage(missionId: string, pageNb: number): Promise<Candidate[]> {
    try {
      const res: GetCandidatePageRsp = await this.get(`${this.endpoint}${missionId}/doers/preselected?page=${pageNb}`);

      const candidateApi = res.data.results;

      return this.candidateCvtr.maptoDomain(candidateApi);
    } catch (ex) {}

    return [];
  }

  public async fetchFavoriteDoersCount(missionId: string): Promise<number> {
    const url = `${this.endpoint}${missionId}/doers/favorite/count`;
    const res: GetFavoriteDoersCountRsp = await this.get(url);

    if (!res.success) {
      throw new Error();
    }

    const count = res.data.count;

    return count;
  }
}
