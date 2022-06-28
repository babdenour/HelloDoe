import { FacebookEntryPoint } from '../domains/job-board/facebook-entry-point';
import { FacebookEntryPointImpl } from '../domains/job-board/facebook-entry-point.impl';

export class EntryPointFactory {
  static createFacebookEntryPoint(args?: Partial<FacebookEntryPoint>): FacebookEntryPointImpl {
    const now = Date.now();
    const entryPt: FacebookEntryPoint = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id,
      jobBoard: args?.jobBoard,
      pageId: args?.pageId,
    };

    return new FacebookEntryPointImpl(entryPt);
  }
}
