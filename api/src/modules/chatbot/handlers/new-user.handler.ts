import {
  AccessCardFactory,
  AccessCardRepositoryBusiness,
  DoerFactory,
  FacebookEntryPointImplBusiness,
} from '@business';
import { DoerRepository, InjectAccessCardRepository, InjectDoerRepository } from '@database';
import { Injectable } from '@nestjs/common';

import { ActionNames } from '../constants/action-names';
import { Action } from '../domains/action';
import { HandlerDecorator } from '../handler.decorator';
import { ActionHandler } from '../types/action-handler';
import { MessagingPlatform } from '../types/messaging-platform';

@Injectable()
@HandlerDecorator()
export class NewUserHandler implements ActionHandler {
  constructor(
    @InjectAccessCardRepository private readonly accessCardRepo: AccessCardRepositoryBusiness,
    @InjectDoerRepository private readonly doerRepo: DoerRepository,
  ) {}

  public canHandle(action: Action): boolean {
    return action.name === ActionNames.CREATE_USER;
  }

  public async handle(_: Action, messagingPlatform: MessagingPlatform): Promise<void> {
    const doer = await messagingPlatform.getDoer();
    if (!doer) {
      await this.createDoer(messagingPlatform);
    }
  }

  private async createDoer(messagingPlatform: MessagingPlatform): Promise<void> {
    const doer = await this.doerRepo.save(DoerFactory.create());
    const entryPt = messagingPlatform.getEntryPoint();

    if (entryPt instanceof FacebookEntryPointImplBusiness) {
      await this.accessCardRepo.save(
        AccessCardFactory.createFacebookAccessCard({
          doer: doer.id,
          entryPoint: entryPt.id,
          pageScopeId: messagingPlatform.getDoerPlatformId(),
        }),
      );
    } else {
      throw new Error(`Type of entry point ${entryPt.id} is not supported`);
    }
  }
}
