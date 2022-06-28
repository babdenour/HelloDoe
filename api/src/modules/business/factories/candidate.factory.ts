import { CandidateContactInformation, CandidateImpl, CandidateVideoCv } from '../domains/candidate.impl';

export class CandidateFactory {
  static create(args?: Partial<CandidateImpl>): CandidateImpl {
    const candidate: CandidateImpl = {
      age: args?.age || 0,
      appliedAt: args?.appliedAt || 0,
      contactInformation: args?.contactInformation ? this.createContactInfo(args.contactInformation) : undefined,
      firstName: args?.firstName,
      id: args?.id,
      isFavorite: args?.isFavorite,
      isSeen: args?.isSeen,
      lastName: args?.lastName,
      score: args?.score,
      status: args?.status || 'OTHER',
      videoCvs: (args?.videoCvs || []).map((videoCv) => this.createVideoCv(videoCv)),
    };

    return new CandidateImpl(candidate);
  }

  static createVideoCv(args?: Partial<CandidateVideoCv>): CandidateVideoCv {
    const videoCv: CandidateVideoCv = {
      id: args?.id || '',
      imgUrl: args?.imgUrl || '',
      question: args?.question || '',
      videoUrl: args?.videoUrl || '',
    };

    return videoCv;
  }

  static createContactInfo(args?: Partial<CandidateContactInformation>): CandidateContactInformation {
    const contactInfo: CandidateContactInformation = {
      email: args?.email || '',
      phone: args?.phone || '',
    };

    return contactInfo;
  }
}
