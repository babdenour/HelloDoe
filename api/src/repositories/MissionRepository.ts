import * as Mission from '../models/Mission';
import { MissionInterface, WorkerInterface } from '../types';

export class MissionRepository {
  /**
   * Find a mission by id.
   * @param id
   */
  public async findOneById(id: string): Promise<MissionInterface | null> {
    const mission = await Mission.findOne({ _id: id });

    return (mission as unknown) as MissionInterface | null;
  }

  /**
   * Find workers hired for a mission by mission id.
   * @param id
   * @returns Promise object represents an array of workers.
   */
  public async findHiredWorkersById(id: string): Promise<WorkerInterface[]> {
    const mission = ((await Mission.findOne({ _id: id })
      .select('hired')
      .populate('hired')
      .exec()) as unknown) as MissionInterface;

    return mission.hired;
  }

  /**
   * Save a mission.
   * @param mission
   */
  public async save(mission: MissionInterface): Promise<MissionInterface | null> {
    await mission.save();

    return mission;
  }
}
