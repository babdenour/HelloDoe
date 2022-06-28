import { DoerImpl } from '../domains/doer.impl';

export interface DoerRepository {
  findById: (id: string) => Promise<DoerImpl>;
  findAllByIdIn: (ids: string[]) => Promise<DoerImpl[]>;
  save: (doer: DoerImpl) => Promise<DoerImpl>;
}
