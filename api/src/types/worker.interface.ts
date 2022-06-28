import { MissionInterface } from './mission.interface';

export interface WorkerProfileInterface {
  first_name: string;
  last_name: string;
  birthday: string;
  gender: number;
  email: string;
  phone: string;
  department: number;
  city: string;
  nationality: string;
  imgUrl: string;
}

export interface WorkerWorkProfileInterface {
  hasCompletedFreelanceProcess: boolean;
  siret: string;
  availabilities: {
    type: number;
    timeSlots: any[];
    deadline: number;
  };
  location: number[];
  rating: number;
  missions: MissionInterface[];
}

export interface WorkerInterface {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  profile: WorkerProfileInterface;
  workProfile: WorkerWorkProfileInterface;
  save: () => void;
  setDeadline: (number) => void;
  doesNeedToCompleteFreelanceProcess: () => boolean;
}
