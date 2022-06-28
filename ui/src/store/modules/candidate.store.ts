import { Candidate } from '@domains/candidate';
import { store } from '@store';
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const MODULE_NAME: string = 'candidate';

@Module({
  dynamic: true,
  namespaced: true,
  name: MODULE_NAME,
  store,
})
class CandidateVuexModule extends VuexModule {
  list: Candidate[] = [];
  isLastPageReached: boolean = false;
  favoriteDoersCount: number = 0;
  pageNb: number = 1;
  isLoadingPage: boolean = false;

  @Mutation
  update(candidate: Candidate): void {
    const doerToUpdateIdx: number = this.list.findIndex((c: Candidate) => c.id === candidate?.id);

    if (doerToUpdateIdx > -1) {
      this.list.splice(doerToUpdateIdx, 1, candidate);
      this.list = [...this.list];
    }
  }

  @Mutation
  public setFavoriteCount(count: number): void {
    this.favoriteDoersCount = count;
  }

  @Mutation
  public setIsLoadingPage(isLoadingPage: boolean): void {
    this.isLoadingPage = isLoadingPage;
  }

  @Mutation
  public addCandidates(doers: Candidate[]): void {
    this.list = this.list.concat(doers);
  }

  @Mutation
  public incrementPageNb(): void {
    this.pageNb++;
  }

  @Mutation
  public setIsLastPageReached(isReached: boolean): void {
    this.isLastPageReached = isReached;
  }
}

export const candidateStore: CandidateVuexModule = getModule(CandidateVuexModule);
