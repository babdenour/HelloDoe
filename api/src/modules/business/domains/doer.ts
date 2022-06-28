import { Mission } from './mission';

export enum DoerVideoCvType {
  INTRODUCTION = '1',
}

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

export interface DoerVideoCv {
  id: string;
  imgUrl: string;
  question: string;
  videoUrl: string;
  type: DoerVideoCvType;
}

export interface DoerWorkProfile {
  hasCompletedFreelanceProcess: boolean;
  siret: string;
  availabilities: DoerWorkAvailabilities;
  location: number[];
  rating: number;
  missions: (string | Mission)[];
  videoCvs: DoerVideoCv[];
}

export interface Doer {
  createdAt: number;
  updatedAt: number;
  id: string;
  profile: DoerProfile;
  workProfile: DoerWorkProfile;
}
