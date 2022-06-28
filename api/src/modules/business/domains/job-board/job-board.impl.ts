import { JobBoard } from './job-board';

export class JobBoardImpl implements JobBoard {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;

  name: string;
  missionSources: string[];

  constructor(jobBoard: JobBoard) {
    this.createdAt = jobBoard.createdAt;
    this.updatedAt = jobBoard.updatedAt;
    this.id = jobBoard.id;
    this.name = jobBoard.name;
    this.missionSources = jobBoard.missionSources;
  }
}
