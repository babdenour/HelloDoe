export class MissionFavoriteDoerImpl {
  createdAt: number;
  updatedAt: number;
  id: string;
  mission: string;
  doer: string;

  constructor(missionFavDoer: MissionFavoriteDoerImpl) {
    this.createdAt = missionFavDoer.createdAt;
    this.updatedAt = missionFavDoer.updatedAt;
    this.id = missionFavDoer.id;
    this.mission = missionFavDoer.mission;
    this.doer = missionFavDoer.doer;
  }
}
