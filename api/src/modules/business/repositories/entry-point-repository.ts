import { EntryPointTypeBusiness, FacebookEntryPointImplBusiness } from '@business';

export interface EntryPointRepository {
  findByFacebookPageId: (pageId: string) => Promise<FacebookEntryPointImplBusiness | null>;
  save: (entryPt: EntryPointTypeBusiness) => Promise<EntryPointTypeBusiness>;
}
