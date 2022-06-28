import * as Worker from '../models/Worker';
import { WorkerInterface } from '../types';

export class WorkerRepository {
  /**
   * Find all workers.
   * @returns Promise object represents an array of workers.
   */
  public async findAll(): Promise<WorkerInterface[]> {
    const workers = await Worker.find({}).exec();

    return (workers as unknown) as WorkerInterface[];
  }
}
