import { Agency } from './agency';

export class AgencyImpl implements Agency {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;

  name: string;

  constructor(agency: Agency) {
    this.createdAt = agency.createdAt;
    this.updatedAt = agency.updatedAt;
    this.id = agency.id;
    this.name = agency.name;
  }
}
