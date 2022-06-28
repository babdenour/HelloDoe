import { FacebookAccessCard } from './facebook-access-card';

export class FacebookAccessCardImpl implements FacebookAccessCard {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;

  entryPoint: string;
  doer: string;
  pageScopeId: string;

  constructor(accessCard: FacebookAccessCard) {
    this.createdAt = accessCard.createdAt;
    this.updatedAt = accessCard.updatedAt;
    this.id = accessCard.id;
    this.entryPoint = accessCard.entryPoint;
    this.doer = accessCard.doer;
    this.pageScopeId = accessCard.pageScopeId;
  }
}
