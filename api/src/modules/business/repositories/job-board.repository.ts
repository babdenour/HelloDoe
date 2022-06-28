import { JobBoardImpl } from '../domains/job-board/job-board.impl';

export interface JobBoardRepository {
  findById: (id: string) => Promise<JobBoardImpl | null>;
  save: (jobBoard: JobBoardImpl) => Promise<JobBoardImpl>;
}
