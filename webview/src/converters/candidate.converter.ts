import { CandidateApi, CandidateApiVideoCv } from '@api/candidate.api';
import { Candidate, CandidateStatus } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { validateAndGetEnumValue } from '@libs/hellodash';

export class CandidateConverter {
  public toDomain(args?: Partial<CandidateApi>): Candidate {
    return CandidateFactory.create({
      id: args?.id,
      firstName: args?.firstName,
      lastName: args?.lastName,
      age: args?.age,
      score: args?.score,
      videoCvs: (args?.videoCvs || []).map((videoCv: CandidateApiVideoCv) =>
        CandidateFactory.createVideoCv({
          id: videoCv?.id,
          imgUrl: videoCv?.imgUrl,
          question: videoCv?.question,
          videoUrl: videoCv?.videoUrl,
        }),
      ),
      isFavorite: args?.isFavorite || false,
      isSeen: args?.isSeen || false,
      status: validateAndGetEnumValue(CandidateStatus, args?.status),
      contactInformation: CandidateFactory.createContactInformation({
        email: args?.contactInformation?.email,
        phone: args?.contactInformation?.phone,
      }),
      appliedAt: args?.appliedAt,
    });
  }

  public maptoDomain(candidateApiList: CandidateApi[]): Candidate[] {
    return candidateApiList.map((candidateApi: CandidateApi) => this.toDomain(candidateApi));
  }
}
