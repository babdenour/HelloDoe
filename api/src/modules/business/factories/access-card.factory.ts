import { FacebookAccessCard } from '../domains/job-board/facebook-access-card';
import { FacebookAccessCardImpl } from '../domains/job-board/facebook-access-card.impl';

export class AccessCardFactory {
  static createFacebookAccessCard(args?: Partial<FacebookAccessCard>): FacebookAccessCardImpl {
    const now = Date.now();
    const accessCard: FacebookAccessCard = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      entryPoint: args?.entryPoint,
      doer: args?.doer,
      pageScopeId: args?.pageScopeId,
    };

    return new FacebookAccessCardImpl(accessCard);
  }
}
