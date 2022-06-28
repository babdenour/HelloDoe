export interface DoerInterface {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
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
  };
  workProfile: {
    hasCompletedFreelanceProcess: boolean;
    siret: string;
    availabilities: {
      type: number;
      timeSlots: any[];
      deadline: number;
    };
    location: number[];
    rating: number;
    missions: any[];
  };
}
