import { DoerImplBsn, EntryPointTypeBusiness } from '@business';

export interface MessagingPlatform {
  getDoer: () => Promise<DoerImplBsn | null>;
  getDoerPlatformId: () => string;
  getEntryPoint: () => EntryPointTypeBusiness;
  getPageId: () => string;
}
