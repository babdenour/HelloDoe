import { DoerVideoCv } from '@business/domains/doer';
import { InjectDoerRepository, InjectQuizzRepository, InjectQuizzSheetRepository, QuizzRepository } from '@database';
import { ProviderFactory } from '@modules/provider.factory';
import { Inject, Injectable } from '@nestjs/common';

import { ServiceNames } from '../constants/service-names';
import { CandidateImpl, CandidateStatus } from '../domains/candidate.impl';
import { DoerImpl } from '../domains/doer.impl';
import { QuizzSheetImpl } from '../domains/quizz/quizz-sheet.impl';
import { QuizzImpl } from '../domains/quizz/quizz.impl';
import { BusinessError, BusinessErrorCode } from '../errors/business.error';
import { CandidateFactory } from '../factories/candidate.factory';
import { DoerRepository } from '../repositories/doer.repository';
import { QuizzSheetRepository } from '../repositories/quizz-sheet.repository';
import { reduce } from '../utils/reduce';

const MIN_ACCEPTABLE_SCORE: number = 8;

@Injectable()
export class CandidateService {
  constructor(
    @InjectDoerRepository private readonly doerRepo: DoerRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectQuizzSheetRepository private readonly quizzShtRepo: QuizzSheetRepository,
  ) {}

  public async addToFavoriteForMission(missionId: string, candidateId: string): Promise<void> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);
    const candidate: QuizzSheetImpl = await this.quizzShtRepo.findByQuizzIdAndDoerId(quizz.id, candidateId);

    if (candidate.isUnlocked) {
      throw new BusinessError(BusinessErrorCode.H00011_DOER_ALREADY_UNLOCKED, { doerId: candidateId, missionId });
    }

    await this.quizzShtRepo.updateIsFavoriteByQuizzIdAndDoerId(quizz.id, candidateId, true);
  }

  public async removeFromFavoriteForMission(missionId: string, candidateId: string): Promise<void> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);
    await this.quizzShtRepo.updateIsFavoriteByQuizzIdAndDoerId(quizz.id, candidateId, false);
  }

  public async getFavoriteCountForMission(missionId: string): Promise<number> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);
    const count: number = await this.quizzShtRepo.countFavoriteByQuizzId(quizz.id);

    return count;
  }

  public async setCandidateSeenForMission(missionId: string, candidateId: string): Promise<void> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);

    await this.quizzShtRepo.updateIsSeenByQuizzIdAndDoerId(quizz.id, candidateId, true);
  }

  public async findOneForMission(missionId: string, candidateId: string): Promise<CandidateImpl> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);
    const sheet: QuizzSheetImpl = await this.quizzShtRepo.findByQuizzIdAndDoerId(quizz.id, candidateId);
    const doer: DoerImpl = await this.doerRepo.findById(candidateId);

    return this.buildCandidate(doer, sheet);
  }

  public async findPaginatedForMission(missionId: string, pageIndex: number, pageSize: number = 20): Promise<CandidateImpl[]> {
    const quizz: QuizzImpl = await this.quizzRepo.findByMissionId(missionId);
    const sheets: QuizzSheetImpl[] = await this.quizzShtRepo.findAllSortedByIsUnlockedDescAndScoreDescGreaterThanWithPagination(quizz.id, pageIndex, pageSize);
    const doerIds: string[] = sheets.map((sheet: QuizzSheetImpl) => sheet.doer);
    const doers: DoerImpl[] = await this.doerRepo.findAllByIdIn(doerIds);
    const doersMappedById: Map<string, DoerImpl> = reduce(doers, 'id');

    const candidates: CandidateImpl[] = sheets.map((sheet: QuizzSheetImpl) => this.buildCandidate(doersMappedById.get(sheet.doer), sheet));

    return candidates;
  }

  private buildCandidate(doer: DoerImpl, sheet: QuizzSheetImpl): CandidateImpl {
    return CandidateFactory.create({
      id: doer.id,
      firstName: doer.profile?.firstName,
      lastName: doer.profile?.lastName,
      age: doer.age,
      appliedAt: sheet.completedAt,
      score: sheet?.score,
      status: this.getCandidateStatus(sheet),
      contactInformation: sheet.isUnlocked
        ? CandidateFactory.createContactInfo({
            email: doer.profile?.email,
            phone: doer.profile?.phone,
          })
        : undefined,
      videoCvs: (doer.workProfile?.videoCvs || []).map((videoCv: DoerVideoCv) =>
        CandidateFactory.createVideoCv({
          id: videoCv?.id,
          imgUrl: videoCv?.imgUrl,
          question: videoCv?.question,
          videoUrl: videoCv?.videoUrl,
        }),
      ),
      isFavorite: sheet.isFavorite,
      isSeen: sheet.isSeen,
    });
  }

  private getCandidateStatus(sheet: QuizzSheetImpl): CandidateStatus {
    if (sheet.isUnlocked) {
      return 'UNLOCKED';
    } else if (sheet.isFavorite) {
      return 'FAVORITE';
    } else if (sheet.score >= MIN_ACCEPTABLE_SCORE) {
      return 'PRESELECTED';
    }

    return 'OTHER';
  }
}

// eslint-disable-next-line @typescript-eslint/typedef
export const CandidateServiceProviderFactory = ProviderFactory.createFactory(ServiceNames.CANDIDATE, {
  useClass: CandidateService,
});

// eslint-disable-next-line @typescript-eslint/typedef
export const InjectCandidateService = Inject(ServiceNames.CANDIDATE);
