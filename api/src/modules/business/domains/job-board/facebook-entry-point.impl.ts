import { FacebookEntryPoint } from './facebook-entry-point';

export class FacebookEntryPointImpl implements FacebookEntryPoint {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;

  jobBoard: string;
  pageId: string;

  constructor(entryPoint: FacebookEntryPoint) {
    this.createdAt = entryPoint.createdAt;
    this.updatedAt = entryPoint.updatedAt;
    this.id = entryPoint.id;
    this.jobBoard = entryPoint.jobBoard;
    this.pageId = entryPoint.pageId;
  }
}
