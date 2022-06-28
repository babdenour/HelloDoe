import {
  AccessCardRepositoryBusiness,
  DoerImplBsn,
  EntryPointRepositoryBusiness,
  EntryPointTypeBusiness,
  FacebookAccessCardImplBusiness,
  FacebookEntryPointImplBusiness,
} from '@business';
import { DoerRepository, InjectAccessCardRepository, InjectDoerRepository, InjectEntryPointRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { MessagingPlatform } from '../../types/messaging-platform';
import { MessengerPayload } from './messenger-payload';

@Injectable()
export class FacebookMessenger implements MessagingPlatform {
  private pageId: string;
  private pageScopeId: string;
  private accessCard: FacebookAccessCardImplBusiness;
  private entryPt: FacebookEntryPointImplBusiness;

  constructor(
    @InjectAccessCardRepository private readonly accessCardRepo: AccessCardRepositoryBusiness,
    @InjectDoerRepository private readonly doerRepo: DoerRepository,
    @InjectEntryPointRepository private readonly entryPtRepo: EntryPointRepositoryBusiness,
  ) {}

  public async init(payload: MessengerPayload): Promise<void> {
    this.pageId = payload.data.recipient.id;
    this.pageScopeId = payload.data.sender.id;

    this.entryPt = await this.entryPtRepo.findByFacebookPageId(this.pageId);

    if (!this.entryPt) {
      throw new Error(`Could not find entry point for pageId ${this.pageId}`);
    }

    this.accessCard = await this.accessCardRepo.findByEntryPointIdAndFacebookPageScopeId(this.entryPt.id, this.pageScopeId);
  }

  public async getDoer(): Promise<DoerImplBsn | null> {
    if (this.accessCard) {
      const doer = await this.doerRepo.findById(this.accessCard.doer);
      return doer;
    }

    return null;
  }

  public getDoerPlatformId(): string {
    return this.pageScopeId;
  }

  public getEntryPoint(): EntryPointTypeBusiness {
    return this.entryPt;
  }

  public getPageId(): string {
    return this.pageId;
  }
}
