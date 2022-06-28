export enum CandidateStatus {
  FAVORITE = 'FAVORITE',
  OTHER = 'OTHER',
  PRESELECTED = 'PRESELECTED',
  UNLOCKED = 'UNLOCKED',
}

export interface CandidateContactInformation {
  email: string;
  phone: string;
}

export interface CandidateVideoCv {
  id: string;
  imgUrl: string;
  question: string;
  videoUrl: string;
}

export class Candidate {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly score: number;
  /** @deprecated */
  readonly videoCv: CandidateVideoCv;
  readonly videoCvs: CandidateVideoCv[];
  readonly isFavorite: boolean;
  readonly status: CandidateStatus;
  readonly isSeen: boolean;
  readonly contactInformation: CandidateContactInformation;
  readonly appliedAt: number;

  constructor(candidate: Candidate) {
    this.id = candidate.id;
    this.firstName = candidate.firstName;
    this.lastName = candidate.lastName;
    this.age = candidate.age;
    this.score = candidate.score;
    this.videoCv = candidate.videoCv;
    this.videoCvs = candidate.videoCvs;
    this.isFavorite = candidate.isFavorite;
    this.isSeen = candidate.isSeen;
    this.status = candidate.status;
    this.contactInformation = candidate.contactInformation;
    this.appliedAt = candidate.appliedAt;
  }
}
