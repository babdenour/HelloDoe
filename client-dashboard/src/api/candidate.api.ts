export enum CandidateApiStatus {
  FAVORITE = 'FAVORITE',
  OTHER = 'OTHER',
  PRESELECTED = 'PRESELECTED',
  UNLOCKED = 'UNLOCKED',
}

export interface CandidateApiContactInformation {
  /**
   * Phone number.
   */
  phone: string;

  /**
   * Email.
   */
  email: string;
}

export interface CandidateApiVideoCv {
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

export interface CandidateApi {
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
  contactInformation?: CandidateApiContactInformation;

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
  videoCvs: CandidateApiVideoCv[];

  /**
   * @deprecated see status instead.
   *
   * Whether the doer has been added to favorites.
   */
  isFavorite: boolean;

  /**
   * Status of the candidate.
   */
  status: CandidateApiStatus;

  /**
   *  Whether the doer has been seen
   */
  isSeen: boolean;
}
