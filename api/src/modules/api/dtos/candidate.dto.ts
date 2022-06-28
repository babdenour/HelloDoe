import { CandidateStatusBsn } from '@business';

export interface CandidateContactInformationDto {
  /**
   * Phone number.
   */
  phone: string;

  /**
   * Email.
   */
  email: string;
}

interface CandidateVideoCv {
  /**
   * Id of the video cv.
   */
  id: string;

  /**
   * Url to the thumbnail.
   */
  imgUrl: string;

  /**
   * Question answered in the video.
   */
  question: string;

  /**
   * Url to the video CV.
   */
  videoUrl: string;
}

export class CandidateDto {
  /**
   * Id of the doer.
   */
  readonly id: string;

  /**
   * First name.
   */
  readonly firstName: string;

  /**
   * Last name.
   */
  readonly lastName: string;

  /**
   * Age of the candidate.
   */
  readonly age: number;

  /**
   * Contact information.
   */
  contactInformation?: CandidateContactInformationDto;

  /**
   * Score on a specified quizz.
   */
  readonly score: number;

  /**
   * Timestamp in ms when the candidate applied to the mission.
   */
  readonly appliedAt: number;

  /**
   * List of video cv.
   */
  readonly videoCvs: CandidateVideoCv[];

  /**
   * @deprecated see status instead.
   *
   * Whether the doer has been added to favorites.
   */
  readonly isFavorite: boolean;

  /**
   * Status of the candidate.
   */
  readonly status: CandidateStatusBsn;

  /**
   * Whether the doer has been seen
   */
  readonly isSeen: boolean;

  constructor(candidate: Partial<CandidateDto>) {
    this.age = candidate.age;
    this.appliedAt = candidate.appliedAt;
    this.contactInformation = candidate.contactInformation;
    this.firstName = candidate.firstName;
    this.id = candidate.id;
    this.isFavorite = candidate.isFavorite;
    this.lastName = candidate.lastName;
    this.score = candidate.score;
    this.status = candidate.status;
    this.videoCvs = candidate.videoCvs;
    this.isSeen = candidate.isSeen;
  }
}
