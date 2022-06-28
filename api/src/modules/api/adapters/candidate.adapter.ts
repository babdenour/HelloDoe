import { CandidateImplBsn } from '@business';

import { CandidateDto } from '../dtos/candidate.dto';

export class CandidateAdapter {
  public static toApi(candidate: CandidateImplBsn): CandidateDto {
    return new CandidateDto({
      age: candidate?.age,
      appliedAt: candidate?.appliedAt,
      contactInformation: candidate?.contactInformation
        ? {
            email: candidate?.contactInformation?.email,
            phone: candidate?.contactInformation?.phone,
          }
        : undefined,
      firstName: candidate?.firstName,
      id: candidate?.id,
      isFavorite: candidate?.isFavorite,
      lastName: candidate?.lastName,
      score: candidate?.score,
      status: candidate?.status,
      isSeen: candidate?.isSeen,
      videoCvs: (candidate?.videoCvs || []).map((videoCv) => ({
        id: videoCv?.id,
        imgUrl: videoCv?.imgUrl,
        question: videoCv?.question,
        videoUrl: videoCv?.videoUrl,
      })),
    });
  }

  public static mapToApi(candidates: CandidateImplBsn[]): CandidateDto[] {
    return candidates.map((candidate: CandidateImplBsn) => this.toApi(candidate));
  }
}
