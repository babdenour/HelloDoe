import { JobBoard } from '../domains/job-board/job-board';
import { JobBoardImpl } from '../domains/job-board/job-board.impl';

export class JobBoardFactory {
  static create(args?: Partial<JobBoard>): JobBoardImpl {
    const now = Date.now();
    const accessCard: JobBoard = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      name: args?.name,
      missionSources: args?.missionSources || [],
    };

    return new JobBoardImpl(accessCard);
  }
}
