import { CandidateClient } from '@/clients/candidate.client';
import { Candidate } from '@domains/candidate';
import { candidateStore } from '@store/modules/candidate.store';

export class CandidateService {
  constructor(private readonly candidateClt: CandidateClient) {}

  public isLastPageReached(): boolean {
    return candidateStore.isLastPageReached;
  }

  public getList(): Candidate[] {
    return candidateStore.list;
  }

  public getFavoriteDoersCount(): number {
    return candidateStore.favoriteDoersCount;
  }

  public async fetchNextPage(missionId: string): Promise<void> {
    const shouldFetchPage: boolean = !candidateStore.isLastPageReached && !candidateStore.isLoadingPage;
    if (shouldFetchPage) {
      candidateStore.setIsLoadingPage(true);
      const pageNb: number = candidateStore.pageNb;
      const candidates: Candidate[] = await this.candidateClt.fetchCandidatesPaginatedForMission(missionId, pageNb);

      if (candidates.length > 0) {
        candidateStore.addCandidates(candidates);
        candidateStore.incrementPageNb();
      } else {
        candidateStore.setIsLastPageReached(true);
      }
      candidateStore.setIsLoadingPage(false);
    }
  }

  public async refreshFavoriteDoersCount(missionId: string): Promise<void> {
    const count: number = await this.candidateClt.fetchFavoriteDoersCount(missionId);
    candidateStore.setFavoriteCount(count);
  }

  public async addDoerToFavorite(missionId: string, doerId: string): Promise<void> {
    await this.setDoerFavorite(missionId, doerId, true);
    await this.refreshFavoriteDoersCount(missionId);
  }

  public async removeDoerFromFavorite(missionId: string, doerId: string): Promise<void> {
    await this.setDoerFavorite(missionId, doerId, false);
    await this.refreshFavoriteDoersCount(missionId);
  }

  private async setDoerFavorite(missionId: string, candidateId: string, isFavorite: boolean): Promise<void> {
    let candidate: Candidate;
    if (isFavorite) {
      candidate = await this.candidateClt.addDoerToFavorite(missionId, candidateId);
    } else {
      candidate = await this.candidateClt.removeDoerFromFavorite(missionId, candidateId);
    }

    if (candidate) {
      candidateStore.update(candidate);
    }
  }

  public async setCandidateAsSeen(missionId: string, candidateId: string): Promise<void> {
    let candidate: Candidate = candidateStore.getCandidateById(candidateId);
    if (candidate?.isSeen === false || !candidate) {
      candidate = await this.candidateClt.setCandidateAsSeen(missionId, candidateId);
      candidateStore.update(candidate);
    }
  }
}
