import { AgencyImplBusiness } from '@business';

export class AgencyDto {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly name: string;

  constructor(agency: AgencyImplBusiness) {
    this.createdAt = agency.createdAt;
    this.updatedAt = agency.updatedAt;
    this.id = agency.id;
    this.name = agency.name;
  }
}
