export interface MissionDetails {
  client: {
    address: string;
    company: string;
    contact: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    };
  };
  mission: {
    amount: number;
    category: string;
    dates: MissionDate[];
    description: string;
    district: number;
    status: string;
    nbWorkers: number;
  };
}

export interface MissionDate {
  date: string;
  timeBegin: string;
  timeEnd: string;
}