import { AgencyImpl } from '../domains/agency.impl';

export interface AgencyRepository {
  findAll: () => Promise<AgencyImpl[]>;
  findById: (id: string) => Promise<AgencyImpl | null>;
  save: (agency: AgencyImpl) => Promise<AgencyImpl>;
}
