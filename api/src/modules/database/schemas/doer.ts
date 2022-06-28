import { Types } from 'mongoose';

import { Mission } from '../schemas/mission';

export interface DoerProfile {
  first_name: string;
  last_name: string;
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
  _id: Types.ObjectId;
  imgUrl: string;
  question: string;
  videoUrl: string;
  kind: string;
}

export interface DoerWorkProfile {
  hasCompletedFreelanceProcess: boolean;
  siret: string;
  availabilities: DoerWorkAvailabilities;
  location: number[];
  rating: number;
  missions: (Types.ObjectId | Mission)[];
  videoCvs: DoerVideoCv[];
}

export interface Doer {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  profile: DoerProfile;
  workProfile: DoerWorkProfile;
}
