import { MissionDto } from './mission.dto';

export interface DoerProfile {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: number;
  email: string;
  phone: string;
  department: number;
  address: string;
  city: string;
  country: string;
  nationality: string;
  residencePermitOk: boolean;
  imgUrl: string;
}

export interface DoerWorkAvailabilities {
  type: number;
  timeSlots: [];
  deadline: number;
}

export interface DoerWorkProfile {
  hasCompletedFreelanceProcess: boolean;
  siret: string;
  availabilities: DoerWorkAvailabilities;
  location: number[];
  rating: number;
  missions: (string | MissionDto)[];
}

export class DoerDto {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly profile: DoerProfile;
  readonly workProfile: DoerWorkProfile;

  constructor(doer: DoerDto) {
    this.createdAt = doer?.createdAt;
    this.updatedAt = doer?.updatedAt;
    this.id = doer?.id;
    this.profile = doer?.profile;
    this.workProfile = doer?.workProfile;
  }
}
