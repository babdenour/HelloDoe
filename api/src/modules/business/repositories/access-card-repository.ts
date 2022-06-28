import { AccessCardTypeBusiness, FacebookAccessCardImplBusiness } from '@business';

export interface AccessCardRepository {
  findAll: () => Promise<AccessCardTypeBusiness[]>;
  findByEntryPointIdAndFacebookPageScopeId: (
    entryPtId: string,
    pageScopeId: string,
  ) => Promise<FacebookAccessCardImplBusiness | null>;
  save: (accessCard: AccessCardTypeBusiness) => Promise<AccessCardTypeBusiness>;
}
