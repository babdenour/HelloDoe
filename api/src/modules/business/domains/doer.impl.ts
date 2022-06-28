import { differenceInYears } from 'date-fns';

import { Doer, DoerProfile, DoerWorkProfile } from './doer';

export class DoerImpl implements Doer {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  profile: DoerProfile;
  workProfile: DoerWorkProfile;

  constructor(doer: Doer) {
    this.createdAt = doer.createdAt;
    this.updatedAt = doer.updatedAt;
    this.id = doer.id;
    this.profile = doer.profile;
    this.workProfile = doer.workProfile;
  }

  get age(): number {
    return differenceInYears(Date.now(), Date.parse(this.profile?.birthday));
  }
}
