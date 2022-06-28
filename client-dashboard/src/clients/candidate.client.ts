import { BaseClient } from '@/clients/base.client';
import { FetchCandidatesPaginatedRsp, GetFavoriteDoersCountRsp, SetCandidateAsSeenRes, SetDoerFavoriteParams, SetDoerFavoriteRes } from '@/clients/candidate.client-utils';
import Config from '@/config';
import { CandidateConverter } from '@converters/candidate.converter';
import { Candidate } from '@domains/candidate';
import { TokenService } from '@services/token.service';

export class CandidateClient extends BaseClient {
  endpoint: string;

  constructor(private readonly candidateCvtr: CandidateConverter, tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_CANDIDATES;
  }

  public async fetchCandidatesPaginatedForMission(missionId: string, pageNb: number): Promise<Candidate[]> {
    try {
      const res: FetchCandidatesPaginatedRsp = await this.get(`${this.endpoint}mission/${missionId}?page=${pageNb}`);

      const candidateApi = res.data.results;

      return this.candidateCvtr.maptoDomain(candidateApi);
    } catch (ex) {}

    return [];
  }

  public async fetchFavoriteDoersCount(missionId: string): Promise<number> {
    const url = `${this.endpoint}mission/${missionId}/favorite/count`;
    const res: GetFavoriteDoersCountRsp = await this.get(url);

    if (!res.success) {
      throw new Error();
    }

    const count = res.data.count;

    return count;
  }

  public async addDoerToFavorite(missionId: string, doerId: string): Promise<Candidate> {
    const candidate: Candidate = await this.setDoerFavorite(missionId, doerId, true);

    return candidate;
  }

  public async removeDoerFromFavorite(missionId: string, doerId: string): Promise<Candidate> {
    const candidate: Candidate = await this.setDoerFavorite(missionId, doerId, false);

    return candidate;
  }

  private async setDoerFavorite(missionId: string, candidateId: string, isFavorite: boolean): Promise<Candidate> {
    try {
      const res: SetDoerFavoriteRes = await this.post<SetDoerFavoriteRes, SetDoerFavoriteParams>(`${this.endpoint}mission/${missionId}/favorite/candidate/${candidateId}`, {
        isFavorite,
      });

      if (!res.success) {
        throw new Error();
      }

      return this.candidateCvtr.toDomain(res.data);
    } catch (ex) {}

    return null;
  }

  public async setCandidateAsSeen(missionId: string, candidateId: string): Promise<Candidate> {
    try {
      const res: SetCandidateAsSeenRes = await this.post<SetCandidateAsSeenRes>(`${this.endpoint}mission/${missionId}/seen/candidate/${candidateId}`);

      if (!res.success) {
        throw new Error();
      }

      return this.candidateCvtr.toDomain(res.data);
    } catch (ex) {}

    return null;
  }
}
