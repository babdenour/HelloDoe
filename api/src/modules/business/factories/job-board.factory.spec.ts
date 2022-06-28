import { JobBoardFactory } from './job-board.factory';

describe('JobBoardFactory', () => {
  describe('create', () => {
    it('should create job board with default values', () => {
      const jobBoard = JobBoardFactory.create();

      expect(jobBoard.id).toBe(undefined);
      expect(jobBoard.name).toBe(undefined);
      expect(jobBoard.missionSources).toEqual([]);
    });

    it('should create job board with specified values', () => {
      const jobBoard = JobBoardFactory.create({
        createdAt: 100,
        updatedAt: 100,
        id: '1',
        name: 'name',
        missionSources: ['source1', 'source2'],
      });

      expect(jobBoard.createdAt).toBe(100);
      expect(jobBoard.updatedAt).toBe(100);
      expect(jobBoard.id).toBe('1');
      expect(jobBoard.name).toBe('name');
      expect(jobBoard.missionSources).toEqual(['source1', 'source2']);
    });
  });
});
