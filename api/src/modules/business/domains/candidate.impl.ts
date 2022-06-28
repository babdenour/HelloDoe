/**
 * FAVORITE: candidate has been added to favorites
 *
 * OTHER: candidate applied but doesn't have minimum required score
 *
 * PRESELECTED: candidate applied and has above minimum required score
 *
 * UNLOCKED: candidate has been unlocked
 */
export type CandidateStatus = 'FAVORITE' | 'OTHER' | 'PRESELECTED' | 'UNLOCKED';

export interface CandidateVideoCv {
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

export interface CandidateContactInformation {
  /**
   * Phone number.
   */
  phone: string;

  /**
   * Email.
   */
  email: string;
}

export class CandidateImpl {
  /**
   * Id of the doer.
   */
  id: string;

  /**
   * First name.
   */
  firstName: string;

  /**
   * Last name.
   */
  lastName: string;

  /**
   * Age of the candidate.
   */
  age: number;

  /**
   * Contact information.
   */
  contactInformation?: CandidateContactInformation;

  /**
   * Score on a specified quizz.
   */
  score: number;

  /**
   * Timestamp in ms when the candidate applied to the mission.
   */
  appliedAt: number;

  /**
   * List of video cv.
   */
  videoCvs: CandidateVideoCv[];

  /**
   * @deprecated see status instead.
   *
   * Whether the doer has been added to favorites.
   */
  isFavorite: boolean;

  /**
   * Status of the candidate.
   */
  status: CandidateStatus;

  /**
   * Whether the doer has been seen
   */
  readonly isSeen: boolean;

  constructor(candidate: CandidateImpl) {
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
