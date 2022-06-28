import { Candidate, CandidateContactInformation, CandidateStatus, CandidateVideoCv } from '@domains/candidate';

export class CandidateFactory {
  public static create(args?: Partial<Candidate>): Candidate {
    const candidate: Candidate = {
      id: args?.id || '',
      firstName: args?.firstName || '',
      lastName: args?.lastName || '',
      age: args?.age || 0,
      score: args?.score || 0,
      status: args?.status || CandidateStatus.OTHER,
      isFavorite: args?.isFavorite || false,
      isSeen: args?.isSeen || false,
      contactInformation: this.createContactInformation(args?.contactInformation),
      videoCv: this.createVideoCv(args?.videoCv),
      videoCvs: (args?.videoCvs || []).map(this.createVideoCv),
      appliedAt: args?.appliedAt || 0,
    };

    return new Candidate(candidate);
  }

  public static createContactInformation(args?: Partial<CandidateContactInformation>): CandidateContactInformation {
    return {
      email: args?.email || '',
      phone: args?.phone || '',
    };
  }

  public static createVideoCv(args?: Partial<CandidateVideoCv>): CandidateVideoCv {
    return {
      id: args?.id || '',
      imgUrl: args?.imgUrl || '',
      question: args?.question || '',
      videoUrl: args?.videoUrl || '',
    };
  }
}
