export class MissionUnlockedDoerImpl {
  createdAt: number;
  updatedAt: number;
  id: string;
  mission: string;
  doer: string;

  constructor(unlockedDoer: MissionUnlockedDoerImpl) {
    this.createdAt = unlockedDoer.createdAt;
    this.updatedAt = unlockedDoer.updatedAt;
    this.id = unlockedDoer.id;
    this.mission = unlockedDoer.mission;
    this.doer = unlockedDoer.doer;
  }
}
